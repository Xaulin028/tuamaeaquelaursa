'use strict';

const functions  = require('firebase-functions');
const admin      = require('firebase-admin');

admin.initializeApp();
const mailboxes = admin.firestore().collection('MAILBOXES');
const CONFIG = functions.config().app;



const isValidRequest = (request) => CONFIG.token == request.query.token;



const addNewMessage = (fields) => {
    const recipient = fields.recipient.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi).shift();
    const cur_time  = Date.now();

    const message = mailboxes.doc(recipient).collection('INBOX').add({
        from       : fields.from,
        subject    : fields.subject,
        bodyHtml   : fields.bodyHtml,
        created_at : cur_time,
    })

    return message;
}



const removeOldMessages = async () => {
    const older_than = Date.now() - CONFIG.remove_older_than;
}



module.exports = {
    isValidRequest,
    addNewMessage,
    removeOldMessages,
}
