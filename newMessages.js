'use strict';
const aws_exports = require('./aws-exports').default;
const aws_client = require('./aws-client').default;
const Mutation = require('./schema/Mutation').default;


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

function mutuateNewMessage() {
    return aws_client.hydrated().then(function (aws_client) {
        // Now run a mutation
        const vari = {
            "content": "Hi Ananth from node client",
            "patientId": "pat01",
            "doctorId": "doct01",
            "type": "0",
            "author": "doct01"
        }

        return aws_client.mutate({ mutation: Mutation, variables: { content: vari.content, patientId: vari.patientId, doctorId: vari.doctorId, type: vari.type, author: vari.author } })
            .then(function logData(data) {
                data = JSON.stringify(data);
                //data = JSON.parse(data);
                console.log('(Mutate): Inserting Data ----------->', data);
            })
            .catch(console.error);
    });
}
module.exports.mutuateNewMessage = mutuateNewMessage;