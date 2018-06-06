const helpers = require('../helpers/helpers')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment')
const RedisHelper = require('../helpers/redis')
const _ = require('underscore')

module.exports = {
    createTrip: async(data) => {
        return new Promise((resolve, reject) => {
            console.log("fetching game data...")
            getGameData(data.gameId).then(gameData => {
                console.log("got the game data")
                data.gameData = gameData
                if (!data.radius) {
                    data.radius = "3.0"
                }

                console.log("User is arriving on ", moment(data.arrivalTime).format("MM-DD-YYYY, hh:mm:ss a"))
                console.log("User is leaving on ", moment(data.departureTime).format("MM-DD-YYYY, hh:mm:ss a"))
                let arrivalDate = moment(data.arrivalTime);
                let departureDate = moment(data.departureTime);

                // First, we are going to create the user's Trip before using our third-party
                // proivders to get the actual places.

                // Create the user's trip stub of their preferences
                let tripStub = createTripStub(data)
                let totalTripTime = Object.keys(tripStub).length
                let required = helpers.getRequiredBusinessesFromTripStub(tripStub)

                // Get a list of businesses that we can filter and sort
                // through before getting more details
                getListOfBusinessesFromProviders(data, required).then(businessData => {
                    let initialListOfBusinesses = []

                    for (var i = 0; i < businessData.length; i++) {
                        initialListOfBusinesses.push(...businessData[i])
                    }

                    // Remove duplicates
                    initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'id')
                    initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'name')
                    // Sort by user preferences
                    initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)
                    
                    let finalListOfBusinesses = {}
                    initialListOfBusinesses.forEach(b => {
                        if (!finalListOfBusinesses[b.subcategory]) finalListOfBusinesses[b.subcategory] = []
                        if(finalListOfBusinesses[b.subcategory].length < required[b.subcategory].count){
                            finalListOfBusinesses[b.subcategory].push(b)
                        }
                    })

                    let finalSetOfDataToFetch = []
                    Object.keys(finalListOfBusinesses).forEach(key => finalSetOfDataToFetch.push(...finalListOfBusinesses[key]))

                    getMoreDetails(finalSetOfDataToFetch).then(finalBusinessData => {
                        let finalBusinesses = []
                        for (var i = 0; i < finalBusinessData.length; i++) {
                            finalBusinesses.push(...finalBusinessData[i])
                        }

                        formatTripFromBusinesses(tripStub, finalBusinesses).then(trip => {
                            return resolve(trip)
                        })
                    })
                })
            })
        })

        function formatTripFromBusinesses(tripStub, businesses) {
            return new Promise((resolve, reject) => {
                console.log("Got the details for the businesses...")
                console.log("Creating trip...")

                Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(day))

                console.log("done!")
                console.log("returning the trip")

                return resolve(tripStub)

                function getBusinessAndBackupOpenAtAvailableTime(day) {
                    let foundBusinesses = []
                    for (var i = 0; i < tripStub[day].length; i++) {
                        let activity = tripStub[day][i]
                        for (var j = 0; j < businesses.length; j++) {
                            let business = businesses[j]
                            for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                                let businessDay = business.hours.individualDaysData[k]
                                if (_.findWhere(foundBusinesses, business) == null && business.subcategory === activity.name && businessDay.open.day === moment(day).day() && businessIsOpenOnTime(businessDay, day, activity)) {
                                    foundBusinesses.push(business)
                                    if (foundBusinesses.length >= 3) {
                                        Object.keys(foundBusinesses[0]).forEach(key => {
                                            activity[key] = foundBusinesses[0][key]
                                        })

                                        activity.backups = [foundBusinesses[1], foundBusinesses[2]]

                                        businesses = _(businesses).filter(function(b) {
                                            return !foundBusinesses.includes(b)
                                        });
                                        foundBusinesses = []
                                    }
                                }
                            }
                        }
                    }
                }
            })

            function businessIsOpenOnTime(businessDay, day, activity) {
                let activityTime = moment(day + ' ' + activity.startTime)
                let businessOpenTime = moment(day + ' ' + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
                let businessCloseTime = moment(day + ' ' + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))

                if (businessOpenTime.isSameOrBefore(activityTime)) return true
                if (businessCloseTime.isSameOrAfter(activityTime)) return true
                if (businessDay.close.day != businessDay.open.day) return true
                return false
            }
        }
    }
}


/**
 * Finds businesses from our providers - this function is 
 * a stub that call all of our helpers
 */
function getListOfBusinessesFromProviders(data, required) {
    return new Promise((resolve, reject) => {
        Promise.all([
            GoogleHelper.findBusinesses(data, required),
            YelpHelper.findBusinesses(data, required)
        ]).then(businesses => {
            return resolve(businesses)
        })
    })
}

function getMoreDetails(businesses) {
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

function getGameData(id) {
    return new Promise((resolve, reject) => {
        TicketMasterHelper.getGameDetails(id).then(details => {
                return resolve(details)
            })
            .catch(e => {
                reject(e)
            })
    })
}

/**
 * Creates a trip stub from the user's preferences that they selected. This
 * will then be used to fetch the appropriate businesse and resturants for
 * the user
 * @param  {Object} data The preferences that the user selected on the mobile app
 * @return {Object}      An object of arrays - one for each day - representing the
 * activites to fetch from our third party providers
 */
function createTripStub(data) {

    // Get the arrival and departure dates for the user's trip
    let arrivalDate = moment(data.arrivalTime);
    let departureDate = moment(data.departureTime);
    let tripStub = {}

    // Split the preferences into two groups:
    //  1. Dining
    //  2. Activities
    // We are only setting 3 food choices per day, and the rest are unlimited

    let food = data.preferences.food.map(option => {
        return {
            name: option,
            category: 'food'
        }
    })

    let dayActivities = data.preferences.dayActivities.map(option => {
        return {
            name: option,
            category: 'day'
        }
    })

    let nightActivities = data.preferences.nightActivities.map(option => {
        return {
            name: option,
            category: 'night'
        }
    })

    diningOptions = helpers.shuffleArray(food)
    dayActivities = helpers.shuffleArray(dayActivities)
    nightActivities = helpers.shuffleArray(nightActivities)

    // Now that we have split the user's choices into two groups, we can begin to create
    // their trip stub

    while (!finishedAddingActivities(arrivalDate, departureDate)) {
        let currentDay = arrivalDate.format('MM-DD-YYYY')
        let isGameDay = false

        if (!tripStub[arrivalDate.format('MM-DD-YYYY')]) tripStub[arrivalDate.format('MM-DD-YYYY')] = []
        if (data.gameData.dates.start.timeTBA && moment(data.gameData.dates.start.localDate).isSame(arrivalDate, 'day')) {
            isGameDay = true
        }

        // Decide if we want to add a dining option or an activity
        let foodOption = needToAddFoodOption(arrivalDate)
        let option

        if (foodOption) {
            option = foodOption
        } else if (parseInt(arrivalDate.format('HHmm')) > config.timeframes.dinner) {
            option = nightActivities[0]
        } else {
            option = dayActivities[0]
        }

        // Make sure that option is not the same as the previous
        while (tripStub[currentDay].length > 0 && option.name === _.last(tripStub[currentDay]).name) {
            // Reshuffle our arrays
            diningOptions = helpers.shuffleArray(food)
            dayActivities = helpers.shuffleArray(dayActivities)
            nightActivities = helpers.shuffleArray(nightActivities)

            // Get the option
            if (foodOption) {
                option = foodOption
                // We already have validation for food options, so we can break
                break
            } else if (parseInt(arrivalDate.format('HHmm')) > config.timeframes.dinner) {
                if (nightActivities.length === 1) {
                    console.log("\n\n\nGOT TO THE BREAK!!!!\n\n\n")
                    break
                }
                option = nightActivities[0]
            } else {
                option = dayActivities[0]
            }
        }

        option.startTime = arrivalDate.format('hh:mm:ss a')
        console.log("option.startTime ", option.startTime)
        tripStub[currentDay].push(option)
        console.log("tripStub for " + currentDay + " is now: ", tripStub[currentDay])
        console.log("\n")

        // Reshuffle our arrays
        diningOptions = helpers.shuffleArray(food)
        dayActivities = helpers.shuffleArray(dayActivities)
        nightActivities = helpers.shuffleArray(nightActivities)

        // Add average duration of activity to day in minutes
        arrivalDate.add(config.activityDuration[_.last(tripStub[currentDay]).name], 'm')

        // If we've hust added lunch and it is game day, then we need to add the game and be finished
        if (parseInt(arrivalDate.format('HHmm')) >= config.timeframes.lunch && isGameDay) {
            let classification = data.gameData.classifications[0].subGenre.name + ' ' + data.gameData.classifications[0].genre.name
            let timeOfGame = helpers.getTimeDurationForGame(classification)


            tripStub[currentDay].push({
                'category': 'game',
                'title': data.gameData.name,
                'classification': classification,
                'time': 'TBA',
                'isTBA': true
            })

            console.log("tripStub for " + currentDay + " is now: ", tripStub[currentDay])
            console.log("\n")

            arrivalDate.add(timeOfGame, 'm')

            if (data.gameData.dates.start.timeTBA) {
                arrivalDate.add(1, 'days');
                arrivalDate.set('hour', 9);
                arrivalDate.set('minute', 0);
            }
        }

        // If we've reached the end of the day time (10:00pm as of 06/02/2018), increase the day
        if (arrivalDate.isBefore(departureDate) && parseInt(arrivalDate.format('HHmm')) >= config.timeframes.endOfDay) {
            // We are done for the day - add one day and reset the time to 9:00am
            arrivalDate.add(1, 'days');
            arrivalDate.set('hour', 9);
            arrivalDate.set('minute', 0);
        }
    }

    return tripStub


    // Helper functions

    function finishedAddingActivities(arrivalDate, departureDate) {
        return (arrivalDate.isSameOrAfter(moment(departureDate, 'day')) && (arrivalDate.format('HH:mm:ss') >= departureDate.format('HH:mm:ss')))
    }

    /**
     * Checks to see if we need to add a food option to the trip stub
     * @param  {Moment} arrivalDate     MomentJS Date of the arrival date
     * @return {Boolean}                True/False if we need to add a food choice
     */
    function needToAddFoodOption(arrivalDate) {
        let time = parseInt(arrivalDate.format('HHmm'))
        let currentDay = tripStub[arrivalDate.format('MM-DD-YYYY')]
        // Convert our timeframes into Moment Dates in 24 hour format

        let dinnerTime = moment(arrivalDate.format('MM-DD-YYYY') + ' ' + helpers.convert24HourIntToString(config.timeframes.dinner))
        let lunchTime = moment(arrivalDate.format('MM-DD-YYYY') + ' ' + helpers.convert24HourIntToString(config.timeframes.lunch))
        let breakfastTime = moment(arrivalDate.format('MM-DD-YYYY') + ' ' + helpers.convert24HourIntToString(config.timeframes.breakfast))

        if (Math.abs(moment.duration(dinnerTime.diff(arrivalDate)).asMinutes()) <= 60 && !alreadyHaveFoodOptionForTheDay(currentDay, 'dinner')) {
            diningOptions[0].timeframe = 'dinner'
            return diningOptions[0]
        } else if (Math.abs(moment.duration(lunchTime.diff(arrivalDate)).asMinutes()) <= 60 && !alreadyHaveFoodOptionForTheDay(currentDay, 'lunch')) {
            diningOptions[0].timeframe = 'lunch'
            return diningOptions[0]
        } else if (Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes()) <= 60 && !alreadyHaveFoodOptionForTheDay(currentDay, 'breakfast')) {
            diningOptions[0].timeframe = 'breakfast'
            return diningOptions[0]
        }

        return false
    }


    function alreadyHaveFoodOptionForTheDay(currentDay, foodOption) {
        return currentDay.some(option => {
            return option.timeframe === foodOption
        })
    }
}