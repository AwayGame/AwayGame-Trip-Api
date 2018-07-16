let foodChoices = ["coffeeShops", "localCuisine", "fastFood", "upscale", "famousSpots", "fastCasual", "tapas", "barFood", "streetFood", "intimate"]
let dayChoices = ["parks", "shopping", "museums", "famousSights", "shows", "guidedTours", "activeTourism", "specialEvents", "historicalPlaces", "healthAndWellness"]
let nightChoices = ["sportsbars", "partybars", "breweries", "nightclubs", "danceHalls", "cocktailLounges", "winebars", "speakeasies", "themedbars", "pubs"]
let games = [{
    gameId: "vvG1zZfzMIKaG_",
    start: "2018-07-10T10:00:00Z"
}, {
    gameId: "vvG1zZfzMIptGl",
    start: "2018-07-12T10:00:00Z"
}, {
    gameId: "Z7r9jZ1Aek_CK",
    start: "2018-07-18T10:00:00Z"
}, {
    gameId: "Z7r9jZ1Aek_qt",
    start: "2018-07-11T10:00:00Z"
}, {
    gameId: "Z7r9jZ1Aek_bd",
    start: "2018-07-14T10:00:00Z"
}, {
    gameId: "Z7r9jZ1Ae8FqY",
    start: "2018-07-18T10:00:00Z"
}, {
    gameId: "Z7r9jZ1AeFZGd",
    start: "2018-07-17T10:15:00Z"
}]


const config = require('../configs')
const moment = require('moment-timezone')
const _ = require('underscore')
const helpers = require('../helpers/helpers')
const TicketMasterHelper = require('../helpers/ticketmaster')
moment.tz.setDefault('America/New_York')

exports.getParams = (req, context, events, next) => {
    let game = _.sample(games, 1)[0]
    game.end = getRandomEnd(game)

    let params = {
        gameId: game.gameId,
        preferences: getPreferences(),
        arrivalTime: game.start,
        departureTime: game.end
    }

    req.json = params
    return next()
};

exports.printTrip = (requestParams, response, context, ee, next) => {
    console.log("here is the response: ", response.body)
    return next()
}


function getPreferences() {
    return {
        dayActivities: _.sample(dayChoices, _.random(3, 7)),
        nightActivities: _.sample(nightChoices, _.random(3, 7)),
        food: _.sample(foodChoices, _.random(3, 7)),
    }
}

function getRandomEnd(game) {
    let end = moment(game.start)
    end.add(_.random(0, 14), 'days')
    end.add(_.random(0, 6), 'hours')
    end.add(_.sample([15, 30, 45, 60], 1), 'minutes')
    return end.toISOString()
}