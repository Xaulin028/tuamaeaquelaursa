'use strict';

const functions  = require('firebase-functions');

module.exports = function (e, utils) {
    e.removeOldMessages = functions.database.ref('/INDEX/{index}').onCreate((snapshot, context) => {
        return utils.removeOldMessages();
    });
};
