var assert = require('assert');
var axios = require('axios')
var _ = require('underscore')

describe('Trip Stub Tests', function() {
    describe('Creating trip stubs', function() {
        it('should create a trip stub', function() {
        	let test = generateRandomArguments()
        	return test
            //assert.equal(-1, [1, 2, 3].indexOf(4));
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