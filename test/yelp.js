config = require('../configs')
const yelp = require('yelp-fusion')
const queue = require('async/queue')
const YelpClient = yelp.client(config.yelp.fusionApiKey);
const async = require('async')
const assert = require('assert');
const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment')
const axios = require('axios')
const _ = require('underscore')

describe('Yelp Tests', function() {
    describe('Fetching data from Yelp', function() {
        it('should create a trip stub', function() {

            YelpClient.search({
                term: "",
                categories: ["acupuncture", "spas", "massage", "halotherapy", "oxygenbars", "saunas"],
                latitude: 38.0487,
                longitude: -84.5023,
                sortBy: 'rating',
                limit: 50,
                radius: 6438
            }).then(response => {
                console.log("*****************")
                console.log("Got this many: ", response.jsonBody.businesses.length)
                response.jsonBody.businesses.forEach(b => {
                    console.log("Name: ", b.name)
                })
                console.log("*****************")
                return true 
            }).catch(e => {
                console.log("error from yelp: ", e)
            });


        });
    });
});


function generateRandomArguments() {
    let dayActivities = ["museums", "famousSights", "activeTourism"]
    let nightActivities = ["partybars", "sportsbars", "danceHalls"]
    let food = ["fastFood", "coffeeShops", "upscale"]

    let numOfDayActivities = _.random(0, dayActivities.length);
    let numOfNightActivities = _.random(0, nightActivities.length);
    let numOfFoodActivities = _.random(0, food.length);

    return {
        "lat": 41.4965,
        "long": -81.6882,
        "preferences": {
            "dayActivities": ["museums", "famousSights", "activeTourism"],
            "nightActivities": ["partybars", "sportsbars", "danceHalls"],
            "food": ["fastFood", "coffeeShops", "upscale"]
        },
        "arrivalTime": "2018-09-05T13:00:00.000Z",
        "departureTime": "2018-09-07T15:00:00.000Z",
        "gameId": "vv17FZ4aGkBiScYD"
    }
}