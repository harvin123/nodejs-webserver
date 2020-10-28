"use strict";
const express = require('express')
const bodyparser = require('body-parser')
var log4js = require('log4js');
const Getallmessages = require('./getMessages');
const subscribetoNewMessage = require('./subscribetoNewMessage');
const MutateNewMessage = require('./newMessages');

const Rx = require('zen-observable');
const { toPromise } = require('apollo-link');
log4js.configure({
    appenders:
        { server: { type: 'file', filename: 'logs/server.log' } },
    categories: { default: { appenders: ['server'], level: "debug" } }

});
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var logger = log4js.getLogger('Server');

/*app.post("/Getallmessages", (req, res) => {
    logger.debug('Got body:', req.body);
    res.send(req.body);
    res.sendStatus(200);
    res.send("successful");
});*/

app.get("/Getallmessages/:patientId/:doctorId", async (req, res) => {
    //res.send("Hello World");
    var result;
    result = await Getallmessages.getMyAllMessages(req.params.patientId, req.params.doctorId);
    res.send(result);
});


app.get("/subscribetomymessage/:patientId/:doctorId", async (req, res) => {
    //logger.debug('Got body:', req.body);
    var result;
    result = await subscribetoNewMessage.subscribetoMyMessage(req.params.patientId, req.params.doctorId);
    res.sendStatus(201);
    ///then(data =>
    //res.sendStatus(201),
    /// res.send(data));
    //res.send(req.body);
    //
    // res.send("successful");
});


app.post("/newMessage", async (req, res) => {
    //logger.debug('Got body:', req.body);
    var result;
    result = await MutateNewMessage.mutuateNewMessage();
    res.sendStatus(201);
    res.send(result);
    //res.send(req.body);
    //
    // res.send("successful");
});


app.listen(3000, err => {
    if (err) {
        logger.debug("there was a problem", err);
        return;
    }
    logger.debug("listening on port 3000");

});