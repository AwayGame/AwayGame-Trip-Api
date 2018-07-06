const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment-timezone')
moment.tz.setDefault('America/New_York')

const distance = require('google-distance');
distance.apiKey = config.google.placesApiKey;

const _ = require('underscore')

module.exports = {
    createTrip: (data) => {
        return new Promise(async(resolve, reject) => {
            addCoffeeShopsPreferenceIfNotInFoodPreferences(data)
            data.gameData = await getGameData('tm-game-' + data.gameId)
            data.lat = (!data.gameData.location) ? data.gameData['location.lat'] : data.gameData.location.lat
            data.long = (!data.gameData.location) ? data.gameData['location.long'] : data.gameData.location.long
            data.radius = "1.5"

            let tripStub = TripStubHelper.createTripStub(data)
            tripStub.failed = true
            if (tripStub.failed) {
                return resolve({
                    failed: true,
                    itineraries: [{
                        activities: [{
                            name: "Sorry, we're still testing and your trip failed. Please try again."
                        }]
                    }]
                })
            }

            //return resolve(tripStub)

            try {
                let required = helpers.getRequiredBusinessesFromTripStub(tripStub)
                console.log("GETTING DATA...")
                let businessData = await getListOfBusinessesFromProviders(data, required)
                console.log("got business data")

                let initialListOfBusinesses = []

                for (var i = 0; i < businessData.length; i++) {
                    initialListOfBusinesses.push(...businessData[i])
                }

                console.log("Number of businesses before we take stuff out: ", initialListOfBusinesses.length)
                initialListOfBusinesses = _.uniq(initialListOfBusinesses, 'id');
                initialListOfBusinesses = _.uniq(initialListOfBusinesses, 'name');
                initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)
                console.log("Number of businesses after we take stuff out: ", initialListOfBusinesses.length)

                //@TODO: Only pull what we need
                let finalListOfBusinesses = getFinalListOfBusinessesFromTripStub(initialListOfBusinesses, required)
                //let finalListOfBusinesses = initialListOfBusinesses
                console.log("got the list of busines: ", finalListOfBusinesses.length)
                let finalBusinessData = await getMoreDetails(finalListOfBusinesses)
                console.log("final list of businesses length: ", finalListOfBusinesses.length)

                let finalBusinesses = []
                for (var i = 0; i < finalBusinessData.length; i++) {
                    console.log("lemgth of finalBusinessData at index " + i + " is: ", finalBusinessData[i].length)
                    finalBusinesses.push(...finalBusinessData[i])
                }
                console.log("fetched this many for final: ", finalBusinesses.length)

                formatTripFromBusinesses(tripStub, finalBusinesses, data).then(trip => {
                    console.log("\n\nfinished creating trip. Here it is:", trip)
                    return resolve(trip)
                })
            } catch (e) {
                console.log("error creating trip")
                console.log(e)
                return resolve({
                    failed: true,
                    itineraries: [{
                        activities: [{
                            title: "Sorry, we're still testing and your trip failed. Please try again."
                        }]
                    }]
                })
            }
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
            cachedGameData.startTime = moment(cachedGameData.date).subtract(1, 'hour')
            console.log("cached data start time: ", cachedGameData.startTime)
            cachedGameData.date = moment(cachedGameData.date)
            return resolve(cachedGameData)
        } else {
            data = await TicketMasterHelper.getGameDetails(_.last(tmGameKey.split('-')))

            console.log("here is the game: ", data)
            let time = data.dates.start.dateTime
            let latLngStr = data._embedded.venues[0].location.latitude + "," + data._embedded.venues[0].location.longitude

            let gameData = {
                'category': 'game',
                "name": data.name,
                "classification": data.classifications[0].subGenre.name + ' ' + data.classifications[0].genre.name,
                "id": data.id,
                "ticketUrl": data.url,
                "isTBA": data.dates.start.timeTBA,
                "date": time,
                "location": {
                    "lat": parseFloat(data._embedded.venues[0].location.latitude),
                    "long": parseFloat(data._embedded.venues[0].location.longitude)
                },
                "photos": [data.images[0].url],
                "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=" + latLngStr + "&markers=color:0x01AF66|" + latLngStr + "&zoom=15&size=300x150&scale=2&key=" + config.google.mapStaticApiKey
            }

            let cacheGameResult = await redisHelper.set(tmGameKey, gameData)

            gameData.startTime = moment(gameData.date).subtract(1, 'hour')
            gameData.date = moment(gameData.date)

            resolve(gameData)
        }
    })
}

function formatTripFromBusinesses(tripStub, businesses, data) {
    return new Promise((resolve, reject) => {
        console.log("getting activities for the trip")
        Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(data, day))
        console.log("finished and checking Uber")
        let tripResponse = {
            "itineraries": Object.keys(tripStub).map(tripStubKey => {
                return {
                    "activities": tripStub[tripStubKey],
                    "date": moment(tripStubKey + 'T12:00:00Z').format('dddd, MMM D')
                }
            })
        }

        let keysToRemove = ["timeframe", "placeId", "reviews", "website", "phone", "phone", "address", "backups", "additionalTime", "hours"]

        tripResponse['itineraries'].forEach(day => {
            day.activities.forEach((a, index) => {
                keysToRemove.forEach(key => delete a[key])
            })
        })

        checkForUber(tripResponse).then(tripResponse => {
            return resolve(tripResponse)
        })

        function checkForUber(tripResponse) {
            return new Promise((resolve, reject) => {
                let count = 0,
                    sum = 0

                tripResponse['itineraries'].forEach(day => {
                    sum += day.activities.length
                })

                tripResponse['itineraries'].forEach(day => {
                    day.activities.forEach((a, index) => {
                        if (!index || (index + 1) === day.activities.length) {
                            day.activities[index].needsUber = true
                            incrementAndCheckIfFinished()
                        } else {
                            let activityOne = day.activities[index - 1]

                            needsUber(activityOne, a).then(needed => {
                                activityOne.needsUber = needed
                                incrementAndCheckIfFinished()
                            })
                        }
                    })
                })

                function incrementAndCheckIfFinished() {
                    count++
                    if (count === sum) {
                        return resolve(tripResponse)
                    }
                }
            })
        }

        function getBusinessAndBackupOpenAtAvailableTime(data, day) {
            console.log("length test.....", businesses.length)
            console.log("\nGetting businesses for this day: ", day)
            let foundBusinesses = []
            let totalAdded = 0
            for (var i = 0; i < tripStub[day].length; i++) {
                let activity = tripStub[day][i]
                let businessFound = false

                for (var j = 0; j < businesses.length; j++) {
                    let business = businesses[j]
                    for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                        let businessDay = business.hours.individualDaysData[k]
                        if (businessHasNotBeenUsed(foundBusinesses, business) && business.subcategory === activity.name /*&& businessDay.open.day === moment(day).day() && businessIsOpenOnTime(businessDay, day, activity)*/ ) {
                            totalAdded++
                            businessFound = true
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


                //@TODO: FIX THIS LATER
                //The solution below is terrible. We need a better way of 
                //choosing new categories if we run out of activities

                let totalCount = 0
                while (!businessFound && activity.category != 'game' && totalCount < 25) {
                    totalCount++

                    let amountMan = 0
                    businesses.forEach(b => {
                        if (b.subcategory === activity.name) {
                            amountMan++
                        }
                    })

                    switch (activity.category) {
                        case 'food':
                            var newName = data.preferences.food[_.random(0, data.preferences.food.length - 1)];
                            activity.name = newName
                            break;
                        case 'day':
                            var newName = data.preferences.dayActivities[_.random(0, data.preferences.dayActivities.length - 1)]
                            activity.name = newName
                            break;
                        case 'night':
                            var newName = data.preferences.nightActivities[_.random(0, data.preferences.nightActivities.length - 1)]
                            activity.name = newName
                            break;
                    }

                    for (var j = 0; j < businesses.length; j++) {
                        let business = businesses[j]
                        for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                            let businessDay = business.hours.individualDaysData[k]
                            if (businessHasNotBeenUsed(foundBusinesses, business)) {
                                totalAdded++
                                businessFound = true
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

                /*
                //Last result. Just add the first one that matches.

                if (totalCount >= 5) {
                    console.log("\n\n\n\n\n\n\n\nWe hit the failsafe...with this activity: ", activity)
                    for (var j = 0; j < businesses.length; j++) {
                        let business = businesses[j]
                        for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                            let businessDay = business.hours.individualDaysData[k]
                            if (businessHasNotBeenUsed(foundBusinesses, business) && business.category === activity.category) {
                                totalAdded++
                                businessFound = true
                                foundBusinesses.push(business)

                                Object.keys(foundBusinesses[0]).forEach(key => {
                                    activity[key] = foundBusinesses[0][key]
                                })

                                businesses = _(businesses).filter(function(b) {
                                    return !foundBusinesses.includes(b)
                                });
                                foundBusinesses = []
                                break
                            }
                        }
                    }
                }*/
            }
        }

        function businessHasNotBeenUsed(foundBusinesses, business) {
            return _.findWhere(foundBusinesses, business) == null || _.findWhere(foundBusinesses, business) == undefined
        }
    })

    function businessIsOpenOnTime(businessDay, day, activity) {
        //console.log("\ndoes it have an open?: ", businessDay.open)
        //console.log("does it have an close?: ", businessDay.close)
        if (!businessDay.open || !businessDay.close) return false
        if (!businessDay.open.time || !businessDay.close.time) return false


        let activityTime = moment(day + ' ' + activity.startTime)
        let businessOpenTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
        let businessCloseTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))
        let timeAfterActivitiy = activityTime.clone().add(config.activityDuration[activity.name], 'm')

        //console.log("comparing businessDay.open.time " + businessDay.open.time + " with formatted: ", businessOpenTime.format('h:mm a'))
        //console.log("comparing businessDay.close.time " + businessDay.close.time + " with formatted: ", businessCloseTime.format('h:mm a'))
        //console.log("is " + businessOpenTime.format('h:mm a') + " the same or before " + activityTime.format('h:mm a') + "?: ", businessOpenTime.isSameOrBefore(activityTime))
        //console.log("is " + businessCloseTime.format('h:mm a') + " the same or after " + timeAfterActivitiy.format('h:mm a') + "?: ", businessCloseTime.isSameOrAfter(timeAfterActivitiy))
        //console.log("\n")
        //@TODO: Make sure that you can stay after close
        //return businessOpenTime.isSameOrBefore(activityTime) && businessCloseTime.isSameOrAfter(timeAfterActivitiy)
        return businessOpenTime.isSameOrBefore(activityTime)
    }
}

function getFinalListOfBusinessesFromTripStub(businesses, required) {
    let finalList = []

    businesses.forEach(b => {
        if (getNumberOfActivitiesThatMatchCategoryInArray(finalList, b.subcategory) < (required[b.subcategory].count * 2)) {
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

function needsUber(activityOne, activityTwo) {
    return new Promise((resolve, reject) => {
        if (activityTwo.category === 'game') return resolve(true)
        if (!activityOne.location || !activityTwo.location) return resolve(true)

        distance.get({
                origin: activityOne.location.lat + ',' + activityOne.location.long,
                destination: activityTwo.location.lat + ',' + activityTwo.location.long,
                units: 'imperial'
            },
            function(err, data) {
                if (err) return resolve(true)
                resolve(parseFloat(data.distance) > 1 && data.distance.split(' ')[1] === 'mi')
            });
    })
}