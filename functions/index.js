const functions  = require('firebase-functions');
const admin      = require('firebase-admin');
const express    = require('express');
const bodyParser = require('body-parser');
const crypto     = require('crypto');
const config     = require('./config/app.js');

admin.initializeApp();


const inbox = admin.database().ref('/INBOX');
const index = admin.database().ref('/INDEX');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Host data into Firebase Realtime Database
 **/
app.post(`/${config.endpoint}`, function(request, response, next) {

	let user_hash = crypto.createHash('md5').update(request.body['recipient'] || 'default').digest('hex');
	let now = Date.now();
	let message = inbox.child(user_hash).push({
		from       : request.body['from']       || null,
		recipient  : request.body['recipient']  || null,
		sender     : request.body['sender']     || null,
		subject    : request.body['subject']    || null,
		timestamp  : request.body['timestamp']  || null,
		bodyHtml   : request.body['body-html']  || null,
		bodyPlain  : request.body['body-plain'] || null,
		created_at : now,
	});

	index.push({
		box        : user_hash,
		message    : message.key,
		created_at : now
	})

	response.send({"message":`Received and hosted at INBOX/${user_hash}/${message.key}`});

	removeOldMessages();
});


/**
 * Remove old messages
 **/
const CUT_OFF_TIME = Date.now() - 86400000;
async function removeOldMessages() {
  const items = await index.orderByChild('created_at').endAt(CUT_OFF_TIME).once('value');

  items.forEach(child => {
    let item = child.val();

    inbox.child(item.box).child(item.message).remove().then(function() {
       index.child(child.key).remove().then(function() {
        return console.log('[%s] removed /INBOX/%s/%s  and  /INDEX/%s   thoose were created at %s', (new Date()).toISOString(), item.box, item.message, child.key, ((new Date(item.created_at)).toISOString()));
      }).catch(function(error) {
        return console.error('[%s] failed /INDEX/%s with error: %s', (new Date()).toISOString(), child.key, error.message);
      });
    }).catch(function(error) {
      return console.error('[%s] failed /INBOX/%s/%s with error: %s', (new Date()).toISOString(), item.box, item.message, error.message);
    });
  });
}


exports.mailgun = functions.https.onRequest(app);
