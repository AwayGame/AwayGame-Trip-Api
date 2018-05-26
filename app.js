var express = require('express');
var app = express();
config = require('./config');
var bodyParser = require('body-parser')
var http = require('http')
API = require('./api/index');

// var CronJob = require('cron').CronJob;
// var onFinish = null;
// var runRightNow = true;
// var timeZone = 'America/New_York';

// var checkForMissedIssuancesCron = '0 */1 * * * *';
// var checkForMissedIssuancesJob = new CronJob(checkForMissedIssuancesCron, function() {
//     OpenAssetsHelper.checkForMissedIssuances();
// }, onFinish, runRightNow, timeZone);


app.post('/api/trip', function(req, res) {
    return res.status(200).send('here')
})

server.listen(config.port, function() {
    console.log("server live on port " + config.port)
});