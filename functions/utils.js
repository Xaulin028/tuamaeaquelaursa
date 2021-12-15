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

    const message = inbox.child(user_hash).push();
    const body    = index;

    message.set({
        from        : fields.from,
        subject     : fields.subject,
        created_at  : cur_time,
    });

    body.child(message.key).set({
        box        : user_hash,
        bodyHtml   : fields.bodyHtml,
        created_at : cur_time,
    });

    console.log(`Received from ${fields.from} to ${fields.recipient} and hosted at INBOX/${user_hash}/${message.key}`);

    return {
        user    : user_hash,
        message : message.key
    };
}



const removeOldMessages = async () => {
    const older_than = Date.now() - CONFIG.remove_older_than;

    return index.orderByChild('created_at')
        .endAt(older_than)
        .once('value')
        .then(snap => {
            if (! snap.exists() )
                return;

            const promises = [];

            snap.forEach(child => {
                const item = child.val();
                promises.push(inbox.child(item.box).child(snap.key).remove());
                promises.push(index.child(snap.key).remove());
            });

            return Promise.all(promises);
        });
}



module.exports = {
    isValidRequest,
    addNewMessage,
    removeOldMessages,
    index,
}
