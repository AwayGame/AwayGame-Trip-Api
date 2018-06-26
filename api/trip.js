const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment')
const _ = require('underscore')

module.exports = {
    createTrip: (data) => {
        return new Promise(async(resolve, reject) => {
            addCoffeeShopsPreferenceIfNotInFoodPreferences(data)

            data.gameData = await getGameData('tm-game-' + data.gameId)
            data.lat = data.gameData.lat
            data.long = data.gameData.long
            data.radius = "1.5"

            let tripStub = TripStubHelper.createTripStub(data)
            //return resolve(tripStub)

            let required = helpers.getRequiredBusinessesFromTripStub(tripStub)

            // Get a list of businesses t hat we can filter and sort
            // through before getting more details
            let businessData = await getListOfBusinessesFromProviders(data, required)
            console.log("got business data")

            let initialListOfBusinesses = []

            for (var i = 0; i < businessData.length; i++) {
                initialListOfBusinesses.push(...businessData[i])
            }

            // Remove duplicates
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'id')
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'name')
            // Sort by user preferences
            initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)

            let finalListOfBusinesses = getFinalListOfBusinessesFromTripStub(initialListOfBusinesses, required)
            let finalBusinessData = await getMoreDetails(finalListOfBusinesses)

            let finalBusinesses = []
            for (var i = 0; i < finalBusinessData.length; i++) {
                finalBusinesses.push(...finalBusinessData[i])
            }

            formatTripFromBusinesses(tripStub, finalBusinesses).then(trip => {
                return resolve(trip)
            })
        })
    }
}


/**
 * Fetches data from third party providers. Gets the initial list of businesses
 * that we are going to sort and use
 * @param  {Object} data     The data that was passed in from the front
 * @param  {Object} required The required number of businesses we need to get
 * for this trip
 * @return {Array}           An array of businesses to start sorting and looking through
 */
async function getListOfBusinessesFromProviders(data, required) {
    return new Promise(async(resolve, reject) => {
        let businesses = await Promise.all([
            GoogleHelper.findBusinesses(data, required),
            YelpHelper.findBusinesses(data, required)
        ])

        return resolve(businesses)
    })
}

async function getMoreDetails(businesses) {
    return new Promise((resolve, reject) => {

        let data = {}
        for (var i = 0; i < businesses.length; i++) {
            if (!data[businesses[i].provider]) {
                data[businesses[i].provider] = []
            }
            data[businesses[i].provider].push(businesses[i])
        }

        Promise.all([
            GoogleHelper.getMoreDetails(data['google']),
            YelpHelper.getMoreDetails(data['yelp'])
        ]).then(businesses => {
            return resolve(businesses)
        })
    })
}

/**
 * Sorts by the user's preferences
 * @param  {Array}  businesses          The businesses to sort
 * @param  {Object} preferences         The user's preferences that they entered in the app
 * @return {Array}                      The sorted businesses
 */
function sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(businesses, preferences) {
    // For now, just sort by rating...
    businesses = businesses.sort(function(a, b) {
        return b.rating - a.rating
    });
    return businesses
}

/**
 * Fetches the game that the user is going to via the TicketMaster Event ID that they passed
 * up to the API. This function first checks to see if the game is stored in Redis. If it
 * is, then we return it from the cache. If not, we use the TicketMaster API to fetch the
 * game, then cache it for easy retrieval later.
 * @param  {String} tmGameKey The formatted TicketMaster key, which may or may not be
 * stored in Redis. 
 * @return {Object} The Event object from TicketMaster
 */
async function getGameData(tmGameKey) {
    let data
    return new Promise(async(resolve, reject) => {
        let cachedGameData = await redisHelper.get(tmGameKey)
        if (cachedGameData) {
            cachedGameData.timeUserShouldGetToStadium = moment(cachedGameData.date).subtract(1, 'hour')
            cachedGameData.date = moment(cachedGameData.date)
            return resolve(cachedGameData)
        } else {
            data = await TicketMasterHelper.getGameDetails(_.last(tmGameKey.split('-')))

            let time = data.dates.start.dateTime
            let gameData = {
                'category': 'game',
                "title": data.name,
                "classification": data.classifications[0].subGenre.name + ' ' + data.classifications[0].genre.name,
                "id": data.id,
                "ticketUrL": data.url,
                "isTBA": data.dates.start.timeTBA,
                "date": time,
                "lat": parseFloat(data._embedded.venues[0].location.latitude),
                "long": parseFloat(data._embedded.venues[0].location.longitude)
            }

            console.log("date: ", gameData.date)

            let cacheGameResult = await redisHelper.set(tmGameKey, gameData)

            gameData.timeUserShouldGetToStadium = moment(gameData.date).subtract(1, 'hour')
            gameData.date = moment(gameData.date)

            resolve(gameData)
        }
    })
}

function formatTripFromBusinesses(tripStub, businesses) {
    return new Promise((resolve, reject) => {
        Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(day))

        let tripResponse = {
            "itineraries": Object.keys(tripStub).map(tripStubKey => {
                return {
                    "activities": tripStub[tripStubKey],
                    "date": tripStubKey
                }
            })
        }

        let keysToRemove = ["timeframe", "placeId", "reviews", "website", "phone", "phone", "address", "backups", "additionalTime", "hours"]

        tripResponse['itineraries'].forEach(day => {
            day.activities.forEach(a => {
                keysToRemove.forEach(key => delete a[key])
            })
        })

        return resolve(tripResponse)

        function getBusinessAndBackupOpenAtAvailableTime(day) {
            let foundBusinesses = []
            for (var i = 0; i < tripStub[day].length; i++) {
                let activity = tripStub[day][i]
                for (var j = 0; j < businesses.length; j++) {
                    let business = businesses[j]
                    for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                        let businessDay = business.hours.individualDaysData[k]
                        if (_.findWhere(foundBusinesses, business) == null &&
                            business.subcategory === activity.name &&
                            businessDay.open.day === moment(day).day() &&
                            businessIsOpenOnTime(businessDay, day, activity)) {
                            foundBusinesses.push(business)

                            Object.keys(foundBusinesses[0]).forEach(key => {
                                activity[key] = foundBusinesses[0][key]
                            })

                            businesses = _(businesses).filter(function(b) {
                                return !foundBusinesses.includes(b)
                            });
                            foundBusinesses = []
                        }
                    }
                }
            }
        }
    })

    function businessIsOpenOnTime(businessDay, day, activity) {
        if (!businessDay.open.time || !businessDay.close.time) return false

        let activityTime = moment(day + ' ' + activity.startTime)
        let businessOpenTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
        let businessCloseTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))

        if (businessOpenTime.isSameOrBefore(activityTime)) return true
        if (businessCloseTime.isSameOrAfter(activityTime)) return true
        if (businessDay.close.day != businessDay.open.day) return true
        return false
    }
}

function getFinalListOfBusinessesFromTripStub(businesses, required) {
    let finalList = []

    businesses.forEach(b => {
        if (getNumberOfActivitiesThatMatchCategoryInArray(finalList, b.subcategory) < required[b.subcategory].count) {
            finalList.push(b)
        }
    })

    return finalList
}

function getNumberOfActivitiesThatMatchCategoryInArray(array, category) {
    if (!array.length) return 0

    let count = _.countBy(array, function(item) {
        return item.subcategory === category;
    });
    return count.true || 0
}

function addCoffeeShopsPreferenceIfNotInFoodPreferences(data) {
    if (!_.contains(data.preferences.food, 'coffeeShops')) {
        data.preferences.food.push('coffeeShops')
    }
}