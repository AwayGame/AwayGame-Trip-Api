const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const http = require('http')
const server = http.createServer(app);
axios = require('axios');
config = require('./config');
API = require('./api/index');
redisHelper = require('./helpers/redis')

app.use(bodyParser.json());
app.use(cors({ origin: true }))
// Uncomment below for compression
//app.use(compression());

app.post('/api/trip', (req, res) => {
    API.Trip.createTrip(req.body).then(trip => {
    	// Add the user's preferences that they used when creating the trip
    	trip.preferencesUsed = req.body
        return res.send(trip)
    }).catch(error => {
        console.log("error: ", error)
        return res.status(error.status).send({
            error: error.error
        })
    })
})

server.listen(config.port, function() {
    console.log("server live on port " + config.port)
});