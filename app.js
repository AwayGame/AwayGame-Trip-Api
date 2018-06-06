const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const http = require('http')
const server = http.createServer(app);
axios = require('axios');
config = require('./configs');
API = require('./api/index');
redisHelper = require('./helpers/redis')

app.use(bodyParser.json());
app.use(cors({ origin: true }))
// Uncomment below for compression
//app.use(compression());

app.post('/api/trip', async (req, res) => {
    let trip = await API.Trip.createTrip(req.body)
    trip.preferencesUsed = req.body
    return res.send(trip)
})

server.listen(config.port, function() {
    console.log("server live on port " + config.port)
});