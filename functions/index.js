const functions  = require('firebase-functions');
const admin      = require('firebase-admin');
const express    = require('express');
const bodyParser = require('body-parser');
const crypto     = require('crypto');
const config     = require('./config/app.js');

admin.initializeApp();

const box   = admin.database().ref('/INBOX');
const index = admin.database().ref('/INDEX');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/${config.endpoint}`, function(request, response, next) {

	let user_hash = crypto.createHash('md5').update(request.body['recipient'] || 'default').digest('hex');
	let now = Date.now();
	let message = box.child(user_hash).push({
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

	response.send({"message":"Post received. Thanks!"});
});

exports.mailgun = functions.https.onRequest(app);
