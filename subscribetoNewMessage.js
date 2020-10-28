'use strict';
const aws_exports = require('./aws-exports').default;
const aws_client = require('./aws-client').default;
const Subscription = require('./schema/Subscription').default;
const websocket_client = require("./socket_client").default;

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

function subscribetoMyMessage(patientId, doctorId) {
    // APP CODE
    return aws_client.hydrated().then(function (aws_client) {
        // Now run a query
        // Now subscribe to results
        const observable = aws_client.subscribe({ query: Subscription, variables: { patientId: patientId, doctorId: doctorId } });

        const realtimeResults = function realtimeResults(data) {
            console.log('(Realtime Subscription) Subscribing posts -----------> ', data);
            return data;
        };

        //  return new Promise(resolve => {
        observable.subscribe({
            next(data) {
                console.log('(Realtime Subscription) Subscribing posts -----------> ', data);
                // websocket_client.connect('ws://localhost:8080/', 'echo-protocol');
                var client = new WebSocket('ws://localhost:8080/', 'echo-protocol');
                client.onopen = function () {
                    client.send("hello");
                    console.log('message sent');
                }
                return data;
                // resolve(data.data.subscribeToNewMessage);
            },
            complete: console.log("completed"),
            error: console.log,
        })
        // });
    });
}

module.exports.subscribetoMyMessage = subscribetoMyMessage;