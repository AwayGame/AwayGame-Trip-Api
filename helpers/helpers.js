const _ = require('underscore')

module.exports = {
    checkForMissingFields: (requiredParams, data) => {
        let missingKeys = []
        requiredParams.forEach(function(key) {
            if (Object.keys(data).indexOf(key) < 0) {
                missingKeys.push(key)
            }
        })

        return missingKeys
    },
    milesToRadius: (miles) => {
        return config.milesToRadiusConversions[miles]
    },
    shuffleArray: (array) => {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    removeDuplicates: (array, key) => {
        return array.filter((item, index, self) => self.findIndex(b => b[key] === item[key]) === index)
    },
    addProvider: (array, provider) => {
        array.forEach(result => {
            result.provider = provider
        })
        return array
    },
    sortByKey: (array, key) => {
        array = array.sort(function(a, b) {
            return b[key] - a[key]
        });
        return array
    },
    removeIfNoValueByKey: (array, key) => {
        array = _.filter(array, function(obj) {
            return obj[key] !== undefined && obj[key] !== null
        })
        return array
    },
    convert24HourIntToString: (time) => {
        let timeStr = (time < 1000) ? ("0" + String(time)) : String(time)
        return timeStr.substring(0, 2) + ':' + timeStr.substring(2, timeStr.length);
    },
    getTimeDurationForGame: (type) => {
        switch (type) {
            case 'College Football':
                return config.activityDuration['NCAAFB']
                break;
            case 'NBA Basketball':
                return config.activityDuration['NCAAFB']
                break;
            default:
                return 180;
        }
    },
    getRequiredBusinessesFromTripStub: (tripStub) => {
        let required = {}

        Object.keys(tripStub).forEach(day => {
            tripStub[day].forEach(a => {
                if (a.name) {
                    if (!required[a.name]) required[a.name] = {
                        category: a.category,
                        count: 0
                    }

                    required[a.name].count += 4
                }
            })
        })
        return required
    }
}