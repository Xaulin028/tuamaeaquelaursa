'use strict';

const functions  = require('firebase-functions');
const admin      = require('firebase-admin');

admin.initializeApp();
const mailboxes = admin.firestore().collection('INBOX');
const CONFIG = functions.config().app;



const isValidRequest = (request) => CONFIG.token == request.query.token;



const addNewMessage = (fields) => {
    const recipient = fields.recipient.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi).shift();

    return mailboxes.add({
        recipient  : recipient.toLowerCase(),
        from       : fields.from,
        subject    : fields.subject,
        bodyHtml   : fields.bodyHtml,
        created_at : Date.now(),
    });
}



const removeOldMessages = async () => {
    const older_than = Date.now() - CONFIG.remove_older_than;
}



module.exports = {
    isValidRequest,
    addNewMessage,
    removeOldMessages,
}
