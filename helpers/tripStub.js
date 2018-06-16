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

        while (!isLastDay()) {
            addNewActivitiesArrayIfNewDay()
            // Get breakfast option
            getFoodOption()
            // Get activities up to lunch
            addActivitiesFromNowUntilTimeframe('lunch', dayActivities)
            // Get lunch
            getFoodOption()

            // Now that we have added lunch, we need to see if the game
            // is on the current day. If it is, then we need to add it.
            // However, if the game time is TBA, we need to only add the
            // game and then go to the next day

            if (needToAddGame()) {
                addGameAndRestOfDayActivities()
            } else {
                // Get activities up to dinner
                addActivitiesFromNowUntilTimeframe('dinner', dayActivities)
                // Get dinner
                getFoodOption()
                // Get activities for the rest of the night
                addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)
                goToNextDay()
            }
        }

        // Now that we are here, we need to add activities up to the departure
        // time

        //@TODO: FIX THIS BELOW - VERY BAD CODE
        if (finishedAddingActivities()) {
            return tripStub
        }

        addNewActivitiesArrayIfNewDay()
        getFoodOption()

        if (finishedAddingActivities()) {
            return tripStub
        }

        addActivitiesFromNowUntilTimeframe('lunch', dayActivities)

        if (finishedAddingActivities()) {
            return tripStub
        }

        getFoodOption()

        if (finishedAddingActivities()) {
            return tripStub
        }

        addActivitiesFromNowUntilTimeframe('dinner', dayActivities)

        if (finishedAddingActivities()) {
            return tripStub
        }

        getFoodOption()

        if (finishedAddingActivities()) {
            return tripStub
        }

        addActivitiesFromNowUntilTimeframe('endOfDay', nightActivities)

        if (finishedAddingActivities()) {
            return tripStub
        }
    }
}


/**
 * Checks to see if we are finished adding activities for the user's trip stub
 * @return {Boolean}
 */
function finishedAddingActivities() {
    return isLastDay() && (arrivalDate.format('HH:mm:ss') >= departureDate.format('HH:mm:ss'))
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
    return !hasGameBeenAdded() && isGameDay()
}



function addGameAndRestOfDayActivities() {
    if (!game.isTBA) {
        // We have already added lunch at this point. We just need to add
        // activities/food options until the game time.
        addActivitiesFromNowUntilTimeframe('dinner', dayActivities, true)
    }

    tripStub[currentDay].push(game)
    let timeOfGame = helpers.getTimeDurationForGame(game.classification)
    arrivalDate.add(timeOfGame, 'm')
    goToNextDay()
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
    option.startTime = arrivalDate.format('hh:mm a')
    let optionToAdd = Object.assign({}, option)
    tripStub[currentDay].push(optionToAdd)
    arrivalDate.add(config.activityDuration[optionToAdd.name], 'm')
    if(option.additionalTime) {
        arrivalDate.add(option.additionalTime, 'm')
        delete option.additionalTime
    }
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
    currentDay = arrivalDate.format('YYYY-MM-DD')
    dinnerTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.dinner))
    lunchTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.lunch))
    breakfastTime = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.breakfast))
    endOfDay = moment(currentDay + helpers.convert24HourIntToString(config.timeframes.endOfDay))
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
 * @return {Void}     This function does not return anything
 */
function getFoodOption() {
    if(diningOptions.length < 3) {
        shuffleOptions()
        return diningOptions[0]
    }

    while (!foodOptionIsValid(diningOptions[0])) {
        shuffleOptions()
    }


    let foodOption = diningOptions[0]
    foodOption.timeframe = getFoodTimeframeFromCurrentTime()
    addOptionToTrip(foodOption)
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

function addActivitiesFromNowUntilTimeframe(timeframe, activities, accountForGame = false) {
    let time, activitiesToReturn

    if (accountForGame) {
        // Take off two hours to account for travel to the stadium and dining options if needed
        time = Math.abs(moment.duration(arrivalDate.diff(moment(game.date))).asMinutes()) - 150
        activitiesToReturn = findAllCombinationsOfActivitiesForGivenTime(activities, time)
        activitiesToReturn.forEach(a => addOptionToTrip(a))
        getFoodOption()

    } else {
        time = getTimeLeftInMinutesFromTimeframeToNextFoodOption(timeframe)
        activitiesToReturn = findAllCombinationsOfActivitiesForGivenTime(activities, time)
        activitiesToReturn.forEach(a => addOptionToTrip(a))
    }
}

function findAllCombinationsOfActivitiesForGivenTime(activities, target) {
    let datasets = []
    let results = [];
    let dataToReturn = []
    let originalTarget = target


    getPossibleOptionCombinations(0, target, [], results);

    datasets = getDatasetsWithNoRepeats(results)

    while (!datasets.length) {
        results = []
        target -= 5
        getPossibleOptionCombinations(0, target, [], results);
        datasets = getDatasetsWithNoRepeats(results)
    }

    datasets = _.shuffle(datasets)

    for (var i = 0; i < datasets.length; i++) {
        dataToReturn.push(...datasets[i])
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

        if (arrayHasNoDuplicates) {
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
    game = {
        'category': 'game',
        'title': data.gameData.name,
        'classification': data.gameData.classification,
        'timeUserShouldGetToStadium': moment(data.gameData.startTime).subtract(1, 'hours'),
        'date': data.gameData.startTime,
        'isTBA': data.gameData.isTBA
    }
}

function isLastDay() {
    return arrivalDate.isSameOrAfter(moment(departureDate, 'day'))
}