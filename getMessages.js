'use strict';

const { listenerCount } = require('ws');

const aws_exports = require('./aws-exports').default;
const aws_client = require('./aws-client').default;
const Query = require('./schema/Query').default;


global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};

// APP CODE
function getMyAllMessages(patientId, doctorId) {
    return aws_client.hydrated().then(function (aws_client) {
        // Now run a query
        return aws_client.query({ query: Query, variables: { doctorId: doctorId, patientId: patientId } })
            .then(function (data) {
                data = JSON.stringify(data);
                data = JSON.parse(data);
                if (data.data.getMessages) {
                    console.log('(Query Data) All Posts ----------->', data.data.getMessages[0]);
                    /* global.localStorage.setItem("id", data.data.getMessages[0].id);
                     global.localStorage.setItem("content", data.data.getMessages[0].content);
                     global.localStorage.setItem("sender", data.data.getMessages[0].sender);
                     global.localStorage.setItem("toUser", data.data.getMessages[0].toUser);
                     console.log(global.localStorage.store);*/
                    return data.data.getMessages;
                }
                else {
                    console.log("Error while fetching data");
                }
            });
    });
}
module.exports.getMyAllMessages = getMyAllMessages;