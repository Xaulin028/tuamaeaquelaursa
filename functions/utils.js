'use strict';

const functions  = require('firebase-functions');
const admin      = require('firebase-admin');
const crypto     = require('crypto');

admin.initializeApp();
const inbox = admin.database().ref('/INBOX');
const index = admin.database().ref('/INDEX');

const CONFIG = functions.config().app;



const isValidRequest = (request) => CONFIG.token == request.query.token;



const addNewMessage = (fields) => {
    const user_hash = crypto.createHash('md5').update(fields.recipient.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi).shift() || 'default').digest('hex');
    const cur_time  = Date.now();

    const message = inbox.child(user_hash).push({
        from        : fields.from,
        subject     : fields.subject,
        bodyHtml    : fields.bodyHtml,
        bodyPlain   : fields.bodyPlain,
        headers     : fields.headers,
        created_at  : cur_time,
    });

    index.push({
        box        : user_hash,
        message    : message.key,
        created_at : cur_time
    });

    removeOldMessages();

    console.log(`Received from ${fields.from} to ${fields.recipient} and hosted at INBOX/${user_hash}/${message.key}`);

    return {
        user    : user_hash,
        message : message.key
    };
}



const removeOldMessages = async () => {
    const older_than = Date.now() - CONFIG.remove_older_than;

    const items = await index.orderByChild('created_at').endAt(older_than).once('value');

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

module.exports = {
    isValidRequest,
    addNewMessage,
    removeOldMessages
}
