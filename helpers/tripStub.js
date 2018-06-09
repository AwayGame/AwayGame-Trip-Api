const helpers = require('./helpers')
const moment = require('moment')
const _ = require('underscore')

let arrivalDate = null,
    departureDate = null,
    game = null,
    food = null,
    option = null,
    dayActivities = null,
    nightActivities = null,
    diningOptions = null,
    currentDay = null,
    tripStub = null

module.exports = {
    /**
     * Creates the user's trip stub
     * @param  {Object} data The data passed up from the mobile client
     * @return {Object}      The user's trip stub
     */
    createTripStub: (data) => {
        startNewTrip(data)
        setPreferencesToSearchOn(data)

        while (!finishedAddingActivities()) {
            addNewActivitiesArrayIfNewDay()
            getOption()

            // Make sure that option is not the same as the previous
            while (previousOptionIsTheSameAsCurrentOption(option)) {
                getOption()
            }

            console.log("option: " + option.category + " - " + option.name)
            addOptionToTrip(option)

            // If we've reached the end of the day time (10:00pm as of 06/02/2018), increase the day
            if (isEndOfDay()) {
                console.log("at the end of the day...")
                console.log("**********************************")
                console.log("here's what we got!: ", tripStub[currentDay])
                console.log("\n")
                goToNextDay()
            }
        }

        return tripStub
    }
}


/**
 * Checks to see if we are finished adding activities for the user's trip stub
 * @return {Boolean}
 */
function finishedAddingActivities() {
    return (arrivalDate.isSameOrAfter(moment(departureDate, 'day')) && (arrivalDate.format('HH:mm:ss') >= departureDate.format('HH:mm:ss')))
}

/**
 * Checks to see if we need to add a food option to the trip stub
 * @return {Boolean}
 */
function needToAddFoodOption() {
    let time = parseInt(arrivalDate.format('HHmm'))

    if (Math.abs(moment.duration(dinnerTime.diff(arrivalDate)).asMinutes()) <= 15) {
        return true
    } else if (Math.abs(moment.duration(lunchTime.diff(arrivalDate)).asMinutes()) <= 15) {
        return true
    } else if (Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes()) <= 15) {
        return true
    }

    return false
}

/**
 * Checks to see if we need to add the game to the user's trip stub
 * If we need to, then we add the game
 * @return {Void} This function does not return anything
 */
function needToAddGame() {
    if (!hasGameBeenAdded() && isGameDay()) {
        if (!game.isTBA && Math.abs(moment.duration(arrivalDate.diff(moment(game.date))).asMinutes()) <= 60) {
            console.log("It's game day and the time is announced!")
            console.log("ADDDDDDDDDD")
            // The game time is set. Check to see if we are ready to add it
        } else if (parseInt(arrivalDate.format('HHmm')) >= config.timeframes.lunch) {
            tripStub[arrivalDate.format('MM-DD-YYYY')].push(game)
            let timeOfGame = helpers.getTimeDurationForGame(game.classification)
            arrivalDate.add(timeOfGame, 'm')
            arrivalDate.add(1, 'days');
            arrivalDate.set('hour', 9);
            arrivalDate.set('minute', 0);
        }
    }
}

function addGame() {
    if (!hasGameBeenAdded() && isGameDay()) {
        console.log("IT'S GAME DAY! :D")
        console.log("Math.abs(moment.duration(arrivalDate.diff(moment(game.date))).asMinutes()): ", Math.abs(moment.duration(arrivalDate.diff(moment(game.date))).asMinutes()))
        if (!game.isTBA && Math.abs(moment.duration(arrivalDate.diff(moment(game.date))).asMinutes()) <= 60) {
            console.log("It's game day and the time is announced!")
            console.log("ADDDDDDDDDD")
            // The game time is set. Check to see if we are ready to add it
        } else if (parseInt(arrivalDate.format('HHmm')) >= config.timeframes.lunch) {
            tripStub[arrivalDate.format('MM-DD-YYYY')].push(game)
            let timeOfGame = helpers.getTimeDurationForGame(game.classification)
            arrivalDate.add(timeOfGame, 'm')
            arrivalDate.add(1, 'days');
            arrivalDate.set('hour', 9);
            arrivalDate.set('minute', 0);
        }
    }
}

/**
 * Checks to see if the current day is the day of the game
 * that the user is going to
 * @return {Boolean}
 */
function isGameDay() {
    return moment(game.date).isSame(arrivalDate, 'day')
}

/**
 * Checks to see if the user's game has been added to the trip stub
 * @return {Boolean}
 */
function hasGameBeenAdded() {
    return _.contains(tripStub[currentDay], game)
}

/**
 * Initialization function that sets our variables for a new trip stub
 * @param  {Object} data    The data that the user passed to the server
 * @return {Void}           This function does not return anything
 */
function startNewTrip(data) {
    tripStub = {}
    arrivalDate = moment(data.arrivalTime);
    departureDate = moment(data.departureTime);
    currentDay = arrivalDate.format('MM-DD-YYYY')
    dinnerTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.breakfast))
    game = {
        'category': 'game',
        'title': data.gameData.name,
        'classification': data.gameData.classification,
        'startTime': moment(data.gameData.startTime).format('hh:mm:ss a'),
        'date': data.gameData.startTime,
        'isTBA': data.gameData.isTBA
    }
}

/**
 * Sets the food, dayActivities, and nightActivities variables to arrays of
 * objectst that we will use to build the trip stub
 * @param   {Object} data   The data that was passed to the server
 * @return  {Void}          This function does not return anything
 */
function setPreferencesToSearchOn(data) {
    food = data.preferences.food.map(option => {
        return {
            name: option,
            category: 'food'
        }
    })

    dayActivities = data.preferences.dayActivities.map(option => {
        return {
            name: option,
            category: 'day'
        }
    })

    nightActivities = data.preferences.nightActivities.map(option => {
        return {
            name: option,
            category: 'night'
        }
    })
}

/**
 * Shuffles the user's options that they have passed in
 * @return {Void} This function does not return anything
 */
function shuffleOptions() {
    diningOptions = helpers.shuffleArray(food)
    dayActivities = helpers.shuffleArray(dayActivities)
    nightActivities = helpers.shuffleArray(nightActivities)
}

/**
 * Gets the next activity for the user's trip for the current day
 * @return {Void} This function does not return anything
 */
function getOption() {
    shuffleOptions()

    if (needToAddFoodOption()) {
        option = getFoodOption()
    } else if (parseInt(arrivalDate.format('HHmm')) > config.timeframes.dinner) {
        option = getNightActivity()
    } else {
        option = getDayActivity()
    }

    option.startTime = arrivalDate.format('hh:mm:ss a')
}

/**
 * Adds the option passed in to the trip stub for the current day
 * @param   {Object} option The option we are adding to the trip stub
 * @return  {Void}          This function does not return anything
 */
function addOptionToTrip(option) {
    let optionToAdd = Object.assign({}, option)

    tripStub[currentDay].push(optionToAdd)
    // Add average duration of activity to day in minutes
    arrivalDate.add(config.activityDuration[optionToAdd.name], 'm')
    console.log("This is it now: ", tripStub[currentDay])
    console.log("\n\n")
}

/**
 * Checks to see if the day is over
 * @return {Boolean}
 */
function isEndOfDay() {
    return parseInt(arrivalDate.format('HHmm')) >= config.timeframes.endOfDay
}

/**
 * Moves on to the next day and sets the time to 9:00am
 * @return {Void} This function does not return anything
 */
function goToNextDay() {
    arrivalDate.add(1, 'days');
    arrivalDate.set('hour', 9);
    arrivalDate.set('minute', 0);
    currentDay = arrivalDate.format('MM-DD-YYYY')
    dinnerTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + ' ' + helpers.convert24HourIntToString(config.timeframes.breakfast))
}

/**
 * Sets an empty array for the current day if it is not set
 * @return {Void} This function does not return anything
 */
function addNewActivitiesArrayIfNewDay() {
    if (!tripStub[currentDay]) {
        tripStub[currentDay] = []
    }
}

/**
 * Checks to see if the last option added is equal to the current
 * option that is selected to add to the trip
 * @param  {Object} option The option we are checking
 * @return {Boolean}
 */
function previousOptionIsTheSameAsCurrentOption(option) {
    return tripStub[currentDay].length > 0 && option.name === _.last(tripStub[currentDay]).name
}

/**
 * Gets a food option for the user's trip stub
 * @return {Object}     The food option for the user's trip
 */
function getFoodOption() {
    while (!foodOptionIsValid(diningOptions[0])) {
        shuffleOptions()
    }

    let foodOption = diningOptions[0]
    foodOption.timeframe = getFoodTimeframeFromCurrentTime()
    return foodOption
}

/**
 * Checks to see if the food option is valid. If it is, it returns a timeframe
 * to set on the option that we picked
 * @param  {Object} optionToCheck The food option to check
 * @return {Boolean}
 */
function foodOptionIsValid(optionToCheck) {
    if (!foodCategoryInDay('dinner') && !foodNameInDay(optionToCheck)) {
        return true
    } else if (!foodCategoryInDay('lunch') && !foodNameInDay(optionToCheck)) {
        return true
    } else if (!foodCategoryInDay('breakfast') && !foodNameInDay(optionToCheck)) {
        return true
    }

    return false
}

/**
 * Checks to see if we have already added this food option for the day. For
 * example, we do not want the user eating breakfast twice
 * @param  {Object} foodOption The food option that we are wanting to add
 * @return {Boolean}
 */
function foodCategoryInDay(foodOption) {
    return tripStub[currentDay].some(option => {
        return option.timeframe === foodOption
    })
}

/**
 * Checks to see if we have added a specific type of food option to the
 * current day. For example, we do not want a user eating Italian twice
 * in one day
 * @param  {Object} foodOption The option to check
 * @return {Boolean}
 */
function foodNameInDay(foodOption) {
    return tripStub[currentDay].some(option => {
        return option.name === foodOption.name
    })
}

/**
 * Gets the appropriate time frame for a food actvity
 * @return {String} The timeframe to set
 */
function getFoodTimeframeFromCurrentTime() {
    let time = parseInt(arrivalDate.format('HHmm'))
    if (Math.abs(moment.duration(dinnerTime.diff(arrivalDate)).asMinutes()) <= 60) {
        return 'dinner'
    } else if (Math.abs(moment.duration(lunchTime.diff(arrivalDate)).asMinutes()) <= 60) {
        return 'lunch'
    } else if (Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes()) <= 60) {
        return 'breakfast'
    }
}

function getNightActivity() {

    // if(Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes())) {
    //     return nightActivities[0]
    // }
    return nightActivities[0]
}

function getDayActivity() {
    let beforeDinner = arrivalDate.isBefore(dinnerTime)
    let beforeLunch = arrivalDate.isBefore(lunchTime)

    if (beforeDinner & !beforeLunch) {
        // We are in between dinner and lunch. Let's check to see
        // how close we are to dinner
        let timeToDinner = getDifferenceInMinutesToTimeframeFromCurrentTime('dinner')
        console.log("time to dinner: ", timeToDinner)

        dayActivities.forEach(a => {
            if(config.activityDuration[a.name] > timeToDinner){
                console.log("\n\nUHOH")
            }
        })

        return dayActivities[0]
    } else if (beforeLunch) {
        console.log("Checking to see how close we are to lunch")
        console.log("here is lunch: ", getDifferenceInMinutesToTimeframeFromCurrentTime('lunch'))
    }

    return dayActivities[0]
}

function getDifferenceInMinutesToTimeframeFromCurrentTime(timeframe) {
    switch (timeframe) {
        case 'breakfast':
            return Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes())
            break;
        case 'lunch':
            return Math.abs(moment.duration(lunchTime.diff(arrivalDate)).asMinutes())
            break;
        case 'dinner':
            return Math.abs(moment.duration(dinnerTime.diff(arrivalDate)).asMinutes())
            break;
    }
}