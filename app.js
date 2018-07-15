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

// Logging
const morgan = require('morgan');
logger = require('./configs/winston');

app.use(bodyParser.json());
app.use(cors({ origin: true }))
app.use(morgan('combined', { stream: logger.stream }));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

app.post('/api/trip', async(req, res) => {
    let trip = await API.Trip.createTrip(req.body)
    delete req.body.gameData
    trip.preferencesUsed = req.body
    return res.send(trip)
})

server.listen(config.port, function() {
    console.log("server live on port " + config.port)
});