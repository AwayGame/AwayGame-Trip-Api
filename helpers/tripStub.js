const helpers = require('./helpers')
const moment = require('moment')
const _ = require('underscore')

let arrivalDate = null,
    departureDate = null,
    game = null,
    option = null,
    dayActivities = null,
    nightActivities = null,
    diningOptions = null,
    currentDay = null,
    tripStub = null,
    breakfastWindow = null,
    lunchWindow = null,
    dinnerWindow = null,
    nextEventOption = null,
    gameTime = null,
    failed = false,
    COUNT = null

module.exports = {
    createTripStub: (data) => {
        startNewTrip(data)
        addExtraFoodCategoriesIfNeeded(data)
        setPreferencesToSearchOn(data)
        getDays()
        Object.keys(tripStub).forEach(day => getActivitiesForTheDay())

        console.log("\n\ncount at the end of it: ", COUNT)

        if (failed) {
            console.log("\n we failed. Returning the default trip stub")
            return {
                failed: true,
                itineraries: [{
                    activities: [{
                        title: "Sorry, we're still testing and your trip failed. Please try again."
                    }]
                }]
            }
        } else {
            console.log("we got a good trip stub. Returning it")
            return tripStub
        }
    }
}

function getActivitiesForTheDay() {
    if(failed){
        console.log("failed returning in getActivitiesForTheDay")
        return
    }

    if (arrivalDate.isBefore(breakfastTime)) {
        arrivalDate.set('hour', 9)
    }

    addActivities()
    checkIfEndOfTrip()
}

function addActivities() {
    console.log("current day: ", currentDay)
    while (!isEndOfDay()) {
        if (COUNT >= 2000) {
            console.log("\n\nHEY HEY we need a break. Breaking")
            arrivalDate = departureDate
            failed = true
            break
        }

        console.log("time: ", arrivalDate.format('h:mm a'))
        if (needToAddGame() && game.isTBA) {
            getFoodOption('breakfast')
            nextEventOption = 'lunch'
            addActivitesUntilNextEvent()
            addGame()
            goToNextDay()
        } else if (needsBreakfast()) {
            getFoodOption('breakfast')
            nextEventOption = 'lunch'
        } else if (needsLunch()) {
            getFoodOption('lunch')
            nextEventOption = 'dinner'
        } else if (needsDinner()) {
            getFoodOption('dinner')
            nextEventOption = 'endOfDay'
        } else {
            addActivitesUntilNextEvent()
        }

        console.log("going to the next event: ", nextEventOption)

        if (nextEventOption === 'dinner' && arrivalDate.isSameOrAfter(dinnerWindow[1])) {
            nextEventOption = 'endOfDay'
        } else if (nextEventOption === 'breakfast' && arrivalDate.isSameOrAfter(breakfastWindow[1])) {
            nextEventOption = 'lunch'
        } else if (nextEventOption === 'lunch' && arrivalDate.isSameOrAfter(lunchWindow[1])) {
            nextEventOption = 'dinner'
        }
    }

    if(failed){
        return
    }

    console.log("it's the end of the day!\n")
}


function needsBreakfast() {
    return arrivalDate.isSameOrAfter(breakfastWindow[0]) &&
        arrivalDate.isSameOrBefore(breakfastWindow[1]) &&
        !addedFoodOption('breakfast')
}

function needsLunch() {
    return arrivalDate.isSameOrAfter(lunchWindow[0]) &&
        arrivalDate.isSameOrBefore(lunchWindow[1]) &&
        !addedFoodOption('lunch')
}

function needsDinner() {
    return arrivalDate.isSameOrAfter(dinnerWindow[0]) &&
        arrivalDate.isSameOrBefore(dinnerWindow[1]) &&
        !addedFoodOption('dinner')
}


function addActivitesUntilNextEvent() {
    console.log("add add")

    if (!nextEventOption) {
        console.log("user is in a weird spot. Need to figure out what is next")
        if (arrivalDate.isSameOrBefore(dinnerWindow[1]) && arrivalDate.isSameOrAfter(lunchWindow[1])) {
            nextEventOption = 'dinner'
        } else if (arrivalDate.isSameOrBefore(lunchWindow[1]) && arrivalDate.isSameOrAfter(breakfastWindow[1])) {
            nextEventOption = 'lunch'
        } else {
            nextEventOption = 'endOfDay'
        }
    }

    let nextEventWindow = getNextEventWindow()
    let activitiesToChooseFrom = getActivitiesToChooseFrom()

    if (needToAddGame() && getDifferenceInMinutes(arrivalDate, game.startTime) <= 150) {
        addGame()
    } else {
        console.log("is arrival before window")
        console.log(arrivalDate.format('h:mm a'))

        while (arrivalDate.isBefore(nextEventWindow)) {
            console.log("increasing count because " + arrivalDate.format('h:mm a') + " is before " + nextEventWindow.format('h:mm a'))
            COUNT++
            let index = _.random(0, activitiesToChooseFrom.length - 1)
            addOptionToTrip(activitiesToChooseFrom[index])
        }
    }
}

function getNextEventWindow() {
    console.log("nextEventOption: ", nextEventOption)
    switch (nextEventOption) {
        case 'lunch':
            return lunchWindow[0]
            break;
        case 'dinner':
            return dinnerWindow[0]
            break;
        case 'endOfDay':
            return endOfDay
            break;
        case 'game':
            return game
            break;
        default:
            return endOfDay
    }
}

function getActivitiesToChooseFrom() {
    switch (nextEventOption) {
        case 'lunch':
            return dayActivities
            break;
        case 'dinner':
            return dayActivities
            break;
        case 'endOfDay':
            return nightActivities
            break;
        case 'game':
            return game
            break;
    }
}

//------------------------------
//----------HELPER FUNCTIONS----
//------------------------------

function addedFoodOption(timeframe) {
    return tripStub[currentDay].some(a => {
        return a.timeframe && a.timeframe === timeframe
    })
}

/**
 * Checks to see if we need to add the game to the user's trip stub
 * If we need to, then we add the game
 * @return {Void} This function does not return anything
 */
function needToAddGame() {
    return !hasGameBeenAdded() && isGameDay()
}

function addGame() {
    tripStub[currentDay].push(game)
    arrivalDate.add(helpers.getTimeDurationForGame(game.classification), 'm')
    arrivalDate.add(60, 'm')
}

/**
 * Checks to see if the current day is the day of the game
 * that the user is going to
 * @return {Boolean}
 */
function isGameDay() {
    return game.date.isSame(arrivalDate, 'day')
}

/**
 * Checks to see if the user's game has been added to the trip stub
 * @return {Boolean}
 */
function hasGameBeenAdded() {
    return _.contains(tripStub[currentDay], game)
}

/**
 * Sets the food, dayActivities, and nightActivities variables to arrays of
 * objectst that we will use to build the trip stub
 * @param   {Object} data   The data that was passed to the server
 * @return  {Void}          This function does not return anything
 */
function setPreferencesToSearchOn(data) {
    diningOptions = data.preferences.food.map(option => {
        return {
            name: option,
            category: 'food',
            activityDuration: config.activityDuration[option]
        }
    })

    dayActivities = data.preferences.dayActivities.map(option => {
        return {
            name: option,
            category: 'day',
            activityDuration: config.activityDuration[option]
        }
    })

    nightActivities = data.preferences.nightActivities.map(option => {
        return {
            name: option,
            category: 'night',
            activityDuration: config.activityDuration[option]
        }
    })

    diningOptions = _.shuffle(diningOptions)
    dayActivities = _.shuffle(dayActivities)
    nightActivities = _.shuffle(nightActivities)
}

/**
 * Adds the option passed in to the trip stub for the current day
 * @param   {Object} option The option we are adding to the trip stub
 * @return  {Void}          This function does not return anything
 */
function addOptionToTrip(option) {
    option.date = arrivalDate.format('YYYY-MM-DD')
    option.startTime = arrivalDate.format('h:mm a')

    let optionToAdd = Object.assign({}, option)
    tripStub[currentDay].push(optionToAdd)
    arrivalDate.add(config.activityDuration[optionToAdd.name], 'm')
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
    currentDay = arrivalDate.format('YYYY-MM-DD')
    dinnerTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.breakfast))
    endOfDay = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.endOfDay))
    game = data.gameData
    breakfastWindow = [moment(currentDay + helpers.convert24HourIntToString(900)), moment(currentDay + helpers.convert24HourIntToString(1030))]
    lunchWindow = [moment(currentDay + helpers.convert24HourIntToString(1100)), moment(currentDay + helpers.convert24HourIntToString(1400))]
    dinnerWindow = [moment(currentDay + helpers.convert24HourIntToString(1800)), moment(currentDay + helpers.convert24HourIntToString(1930))]
    gameTime = game.startTime
    COUNT = 0
}

function isLastDay() {
    return arrivalDate.isSameOrAfter(departureDate, 'day')
}

/**
 * Gets the number of days that the user's trip is
 * @return {Void} This function does not return anything
 */
function getDays() {
    let dateOne = arrivalDate.clone().set('hour', 0)
    let dateTwo = departureDate.clone().set('hour', 0)
    let count = getDifferenceInDays(dateOne, dateTwo)
    count++

    for (var i = 0; i < count; i++) {
        tripStub[dateOne.format('YYYY-MM-DD')] = []
        dateOne.add(1, 'days');
    }
}

function getDifferenceInDays(a, b) {
    return b.diff(a, 'days')
}

function getDifferenceInMinutes(a, b) {
    return Math.abs(b.diff(a, 'minutes'))
}

/**
 * Checks to see if the day is over
 * @return {Boolean}
 */
function isEndOfDay() {
    return arrivalDate.isSameOrAfter(endOfDay)
}

function isEndOfTrip() {
    return arrivalDate.isSameOrAfter(departureDate)
}

/**
 * Moves on to the next day and sets the time to 9:00am
 * @return {Void} This function does not return anything
 */
function goToNextDay() {
    console.log("current time: ", parseInt(arrivalDate.format('HHmm')))
    console.log("before: ", arrivalDate.format('YYYY-MM-DD, h:mm a'))


    if (parseInt(arrivalDate.format('HHmm')) < 1000) {
        arrivalDate.set('hour', 9);
        arrivalDate.set('minute', 0);
    } else {
        arrivalDate.set('hour', 9);
        arrivalDate.set('minute', 0);
        arrivalDate.add(1, 'days');
    }

    currentDay = arrivalDate.format('YYYY-MM-DD')
    dinnerTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.breakfast))
    endOfDay = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.endOfDay))
    breakfastWindow = [moment(currentDay + helpers.convert24HourIntToString(900)), moment(currentDay + helpers.convert24HourIntToString(1030))]
    lunchWindow = [moment(currentDay + helpers.convert24HourIntToString(1200)), moment(currentDay + helpers.convert24HourIntToString(1400))]
    dinnerWindow = [moment(currentDay + helpers.convert24HourIntToString(1800)), moment(currentDay + helpers.convert24HourIntToString(2000))]

    if (isLastDay()) {
        endOfDay = departureDate
    }
}

//----------------------------------------
//------------FOOD FUNCTIONS--------------
//----------------------------------------

/**
 * Gets a food option for the user's trip stub
 * @return {Void}     This function does not return anything
 */
function getFoodOption(timeframe) {
    while (!foodOptionIsValid(diningOptions[0], timeframe)) {
        console.log("increasing count because food option wasn't valid")
        COUNT++
        if(COUNT >= 2000) {
            break
        }
        diningOptions = _.shuffle(diningOptions)
    }

    let foodOption = diningOptions[0]
    foodOption.timeframe = timeframe
    addOptionToTrip(foodOption)
}

/**
 * Checks to see if the food option is valid. If it is, it returns a timeframe
 * to set on the option that we picked
 * @param  {Object} optionToCheck The food option to check
 * @param  {String} timeframe     The timeframe that we are adding the food option to
 * @return {Boolean}
 */
function foodOptionIsValid(optionToCheck, timeframe) {
    return (!foodCategoryInDay(optionToCheck) && foodOptionIsInCorrectTimeframe(optionToCheck, timeframe))
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
 * Checks to see if the food option is in the correct timeframe.
 * For example, we don't want a user going to an upscale restaurant
 * for breakfast
 * @param  {Object} optionToCheck The food option to check
 * @param  {String} timeframe     The timeframe that we are adding the food option to
 * @return {Boolean}            
 */
function foodOptionIsInCorrectTimeframe(foodOption, timeframe) {
    return _.contains(config.diningOptionTimingPreferences[foodOption.name], timeframe)
}

function checkIfEndOfTrip() {
    if(failed){
        console.log("failed returning in checkIfEndOfTrip")
        return
    }

    console.log("checking to see if the user's trip has ended")
    if (!isEndOfTrip()) {
        goToNextDay()
    } else {
        return
    }
}


function addExtraFoodCategoriesIfNeeded(data) {
    let lunchOptionPresent = data.preferences.food.some(option => {
        return _.contains(config.diningOptionTimingPreferences[option], 'lunch')
    })

    let dinnerOptionPresent = data.preferences.food.some(option => {
        return _.contains(config.diningOptionTimingPreferences[option], 'dinner')
    })

    if(!lunchOptionPresent){
        data.preferences.food.push('fastCasual')
    }

    if(!dinnerOptionPresent){
        data.preferences.food.push('localCuisine')
    }
}