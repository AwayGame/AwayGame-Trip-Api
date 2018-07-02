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
        getDays()

        Object.keys(tripStub).forEach(day => getActivitiesForTheDay())

        return tripStub
    }
}

function getActivitiesForTheDay() {
    if (arrivalDate.isBefore(breakfastTime)) {
        arrivalDate.set('hour', 9)
    }

    if (needToAddGame()) {
        console.log("\nIT's GAME DAY\n")
        if (!game.isTBA) {
            let timeToStop = game.date.clone().subtract(1, 'hour')

            if (timeToStop.isAfter(breakfastTime) && timeToStop.isSameOrBefore(lunchTime)) {
                console.log("game is in the morning....")
                let diffInTimes = Math.abs(moment.duration(arrivalDate.diff(timeToStop)).asMinutes())
                diffInTimes = Math.ceil(diffInTimes / 5) * 5;
                console.log("this many minutes after breakfast until user goes to game: ", diffInTimes)
                getFoodOption()
                addActivitiesFromNowUntilTimeframe('', dayActivities, diffInTimes)
                addGame()
            } else if (timeToStop.isSameOrAfter(lunchTime) && timeToStop.isSameOrBefore(dinnerTime)) {
                console.log("game is between lunch and dinner")
                console.log("current time is: ", arrivalDate.format('h:mm a'))
                if (parseInt(arrivalDate.format('HHmm')) >= 1000) {
                    let diffInTimes = Math.abs(moment.duration(arrivalDate.diff(timeToStop)).asMinutes())
                    diffInTimes = Math.ceil(diffInTimes / 5) * 5;
                    console.log("this many minutes after lunch until user goes to game: ", diffInTimes)
                    addActivitiesFromNowUntilTimeframe('', dayActivities, diffInTimes)
                    addGame()
                } else {
                    getFoodOption()
                    addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
                    console.log("got activities")
                    getFoodOption()
                    let diffInTimes = Math.abs(moment.duration(arrivalDate.diff(timeToStop)).asMinutes())
                    diffInTimes = Math.ceil(diffInTimes / 5) * 5;
                    console.log("this many minutes after lunch until user goes to game: ", diffInTimes)
                    addActivitiesFromNowUntilTimeframe('', dayActivities, diffInTimes)
                    addGame()
                }
            } else if (timeToStop.isSameOrAfter(dinnerTime)) {
                console.log("game is after dinner")
                getFoodOption()
                addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
                getFoodOption()
                addActivitiesFromNowUntilTimeframe('dinner', dayActivities)
                let diffInTimes = Math.abs(moment.duration(arrivalDate.diff(timeToStop)).asMinutes())
                diffInTimes = Math.ceil(diffInTimes / 5) * 5;
                console.log("this many minutes after lunch until user goes to game: ", diffInTimes)
                if (diffInTimes < 15) {
                    addGame()
                } else {
                    addActivitiesFromNowUntilTimeframe('', nightActivities, diffInTimes)
                    addGame()
                }
            }

            addActivities()
        } else {
            // Add options up to lunch, then the game, then go to the next day
            getFoodOption()
            addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
            addGame()
        }
    } else {
        addActivities()
    }

    goToNextDay()
}

function addActivities() {
    console.log("adding activities. Here is the time: ", arrivalDate.format('h:mm a'))

    if (arrivalDate.isSameOrAfter(endOfDay)) {
        return
    }

    if (arrivalDate.isBefore(breakfastTime)) {
        arrivalDate.set('hour', 9)
    }

    if (arrivalDate.isSameOrBefore(breakfastTime)) {
        getFullDay()
    } else if (arrivalDate.isSameOrBefore(lunchTime)) {
        getLunchAndRestOfDay()
    } else if (arrivalDate.isSameOrBefore(dinnerTime)) {
        console.log("GETTING DINNER AND REST OF DAY")
        getDinnerAndRestOfDay()
    } else {
        addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
    }
}

function getFullDay() {
    console.log("getting full day. They are departing at: ", departureDate.format('h:mm a'))

    if (!isLastDay()) {
        getFoodOption()
        addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
        getFoodOption()
        addActivitiesFromNowUntilTimeframe('dinner', dayActivities)
        getFoodOption()
        addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
    } else {

        //@TODO: Remove this
        getFoodOption()

        if (isEndOfTrip()) {
            return
        }

        addActivitiesFromNowUntilTimeframe('lunch', dayActivities)

        if (isEndOfTrip()) {
            return
        }

        getFoodOption()

        if (isEndOfTrip()) {
            return
        }

        addActivitiesFromNowUntilTimeframe('dinner', dayActivities)

        if (isEndOfTrip()) {
            return
        }

        getFoodOption()

        if (isEndOfTrip()) {
            return
        }

        addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
    }
}

function getLunchAndRestOfDay() {
    console.log("getting lunch and rest of day")
    addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
    getFoodOption()
    addActivitiesFromNowUntilTimeframe('dinner', dayActivities)
    getFoodOption()
    addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
}

function getDinnerAndRestOfDay() {
    console.log("getting dinner and rest of day")
    addActivitiesFromNowUntilTimeframe('dinner', dayActivities)
    getFoodOption()
    addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
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
    console.log("\nHere is time before we add game: ", arrivalDate.format('h:mm a'))
    tripStub[currentDay].push(game)
    arrivalDate.add(helpers.getTimeDurationForGame(game.classification), 'm')
    arrivalDate.add(60, 'm')
    console.log("Game has been added. Here is the time now: ", arrivalDate.format('h:mm a'))
}

/**
 * Checks to see if the current day is the day of the game
 * that the user is going to
 * @return {Boolean}
 */
function isGameDay() {
    console.log("game: ", game.date.format('h:mm a'))
    console.log("arrivalDate: ", arrivalDate.format('h:mm a'))
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

    shuffleOptions()
}

/**
 * Shuffles the user's options that they have passed in
 * @return {Void} This function does not return anything
 */
function shuffleOptions() {
    diningOptions = _.shuffle(food)
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

    let additionalTime = option.additionalTime
    delete option.additionalTime

    let optionToAdd = Object.assign({}, option)
    tripStub[currentDay].push(optionToAdd)
    arrivalDate.add(config.activityDuration[optionToAdd.name], 'm')

    if (additionalTime) {
        arrivalDate.add(additionalTime, 'm')
    }
}

/**
 * Checks to see if the day is over
 * @return {Boolean}
 */
function isEndOfDay() {
    return parseInt(arrivalDate.format('HHmm')) >= config.timeframes.endOfDay
}

function isEndOfTrip() {
    return arrivalDate.isSameOrAfter(departureDate)
}

/**
 * Moves on to the next day and sets the time to 9:00am
 * @return {Void} This function does not return anything
 */
function goToNextDay() {
    arrivalDate.add(1, 'days');
    arrivalDate.set('hour', 9);
    arrivalDate.set('minute', 0);
    currentDay = arrivalDate.format('YYYY-MM-DD')
    dinnerTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.breakfast))
    endOfDay = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.endOfDay))
}

/**
 * Gets a food option for the user's trip stub
 * @return {Void}     This function does not return anything
 */
function getFoodOption() {
    let timeframe = getFoodTimeframeFromCurrentTime()
    console.log("timeframe: ", timeframe)

    while (!foodOptionIsValid(diningOptions[0], timeframe)) {
        shuffleOptions()
        //console.log("checking ", diningOptions[0])
        //console.log("against " + timeframe)
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
    return (!foodCategoryInDay(timeframe) && !foodNameInDay(optionToCheck) && foodOptionIsInCorrectTimeframe(optionToCheck, timeframe))
}

/**
 * Checks to see if we have already added this food option for the day. For
 * example, we do not want the user eating breakfast twice
 * @param  {Object} foodOption The food option that we are wanting to add
 * @return {Boolean}
 */

function foodCategoryInDay(foodOption) {
    console.log("tripStub: ", tripStub)
    console.log("current day: ", currentDay)
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

/**
 * Gets the appropriate time frame for a food actvity
 * @return {String} The timeframe to set
 */
function getFoodTimeframeFromCurrentTime() {
    let time = parseInt(arrivalDate.format('HHmm'))
    console.log("here is time: ", time)

    if (time >= 1600) {
        return 'dinner'
    } else if (time >= 1200) {
        return 'lunch'
    } else if (time >= 900) {
        return 'breakfast'
    }

    // if (Math.abs(moment.duration(dinnerTime.diff(arrivalDate)).asMinutes()) <= 60) {
    //     return 'dinner'
    // } else if (Math.abs(moment.duration(lunchTime.diff(arrivalDate)).asMinutes()) <= 60) {
    //     return 'lunch'
    // } else if (Math.abs(moment.duration(breakfastTime.diff(arrivalDate)).asMinutes()) <= 60) {
    //     return 'breakfast'
    // }
}

function getTimeLeftInMinutesFromTimeframeToNextFoodOption(timeframe) {
    switch (timeframe) {
        case 'lunch':
            return Math.abs(moment.duration(arrivalDate.diff(lunchTime)).asMinutes())
            break;
        case 'dinner':
            return Math.abs(moment.duration(arrivalDate.diff(dinnerTime)).asMinutes())
            break;
        case 'endOfDay':
            return Math.abs(moment.duration(arrivalDate.diff(endOfDay)).asMinutes())
            break;
    }
}

function addActivitiesFromNowUntilTimeframe(timeframe, activities, passedInTime = null) {
    let time, activitiesToReturn
    time = passedInTime || getTimeLeftInMinutesFromTimeframeToNextFoodOption(timeframe)
    activitiesToReturn = getListOfActivitiesToAddToTrip(activities, time)
    activitiesToReturn.forEach(a => addOptionToTrip(a))
}

function getListOfActivitiesToAddToTrip(activities, target) {
    let minData = helpers.getActivityWithShortestDuration(activities)
    let minActivity = minData[0],
        minTime = minData[1]

    if (target < minTime) {
        return [minActivity]
    }

    let datasets = []
    let results = [];
    let dataToReturn = []
    let originalTarget = target

    getPossibleOptionCombinations(0, target, [], results);

    datasets = _.shuffle(getDatasetsWithNoRepeats(results))

    while (!datasets.length) {
        results = []
        target -= 5
        getPossibleOptionCombinations(0, target, [], results);
        datasets = getDatasetsWithNoRepeats(results)
    }

    if (datasets.length === 1) {
        dataToReturn = datasets[0]
    } else {
        dataToReturn = datasets[_.random(0, datasets.length - 1)]
    }

    if (originalTarget != target) {
        let remainder = Math.floor(originalTarget - target)
        // Add remainder split between the activities
        let remainderOptions = splitRemainingTimeIntoChunks(remainder, dataToReturn.length, 15)

        remainderOptions.forEach((r, i) => {
            dataToReturn[i].additionalTime = r
        })

        return dataToReturn
    } else {
        return dataToReturn
    }

    function getPossibleOptionCombinations(start, leftOver, selection, results) {
        if (leftOver < 0) {
            return; // failure
        }

        if (leftOver === 0) {
            results.push(selection);
            return;
        }

        for (var i = start; i < activities.length; i++) {
            getPossibleOptionCombinations(i, leftOver - config.activityDuration[activities[i].name], selection.concat(activities[i]), results);
        }
    }
}

function splitRemainingTimeIntoChunks(n, k, a) {
    var values = [];
    while (n > 0 && k > 0) {
        if (a % 2 == 0)
            a = Math.floor(n / k / a) * a;
        else
            a = Math.ceil(n / k / a) * a;
        n -= a;
        k--;
        values.push(a);
    }
    return values
}

function getDatasetsWithNoRepeats(data) {
    let datasetsToReturn = []

    for (var i = 0; i < data.length; i++) {
        let dataset = data[i]
        var dupArr = [];
        var groupedByCount = _.countBy(dataset, function(item) {
            return item.name;
        });

        let arrayHasNoDuplicates = _.every(Object.values(groupedByCount), function(num) {
            return num === 1
        });

        if (arrayHasNoDuplicates && dataset.length) {
            datasetsToReturn.push(dataset)
        }
    }
    return datasetsToReturn
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
}

function isLastDay() {
    return arrivalDate.isSameOrAfter(departureDate, 'day')
}

function getDays() {
    let dateOne = arrivalDate.clone().set('hour', 0)
    let dateTwo = departureDate.clone().set('hour', 0)
    
    console.log(dateOne)
    console.log(dateTwo)
    let count = getDifferenceInDays(dateOne, dateTwo)
    count++

    for (var i = 0; i < count; i++) {
        tripStub[dateOne.format('YYYY-MM-DD')] = []
        dateOne.add(1, 'days');
    }
    console.log("done here it is: ", tripStub)
}

function getDifferenceInDays(a, b) {
    return b.diff(a, 'days')
}

function getDifferenceInMinutes(a, b) {
    return Math.abs(b.diff(a, 'minutes'))
}