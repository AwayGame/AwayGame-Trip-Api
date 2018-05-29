const moment = require('moment')
const yelp = require('yelp-fusion')
const queue = require('async/queue')
const helpers = require('./helpers')
const YelpClient = yelp.client(config.yelp.fusionApiKey);
const YELP_PRICE_TO_DOUBLE = {
    '$': 1.25,
    '$$': 2.5,
    '$$$': 3.75,
    '$$$$': 5
}

module.exports = {
    findBusinesses: (data) => {
        return new Promise((resolve, reject) => {
            searchForBusinesses(data).then(results => {
                return resolve(results)
            })
        })
    },
    getMoreDetails: (businesses) => {
        return new Promise((resolve, reject) => {
            getBusinessesInMoreDetail(businesses).then(detailedBusinesses => {
                return resolve(detailedBusinesses)
            })
        })
    }
}

/**
 * 
 * Function definitions
 * 
 */

function searchForBusinesses(data) {
    return new Promise((resolve, reject) => {
        let searches = 0
        let totalCategories = 0
        Object.keys(data.preferences).forEach(key => {
            totalCategories += data.preferences[key].length
        })

        let finalResults = []

        // Search
        Object.keys(data.preferences).forEach(category => {
            data.preferences[category].forEach(subcategory => {

                let lat = data.lat
                let long = data.long
                let preference = category + '-' + subcategory
                let key = redisHelper.getKey(lat, long, 'yelp', preference)

                redisHelper.get(key).then(cachedData => {
                    if (cachedData) {
                        console.log("got cached data from yelp")
                        finalResults = finalResults.concat(cachedData.results)
                        searches++
                        if (searches === totalCategories) {
                            finalResults = helpers.removeDuplicates(finalResults, 'id')
                            finalResults = helpers.addProvider(finalResults, 'yelp')
                            return resolve(finalResults)
                        }
                    } else {
                        console.log("no cached data in yelp...")
                        YelpClient.search({
                            term: getSearchTerm(category, subcategory),
                            categories: getCategories(category, subcategory),
                            latitude: data.lat,
                            longitude: data.long,
                            sortBy: 'rating',
                            limit: 50,
                            radius: helpers.milesToRadius(data.radius)
                        }).then(response => {
                            console.log("just got " + response.jsonBody.businesses.length + " businessess...")
                            if (response.jsonBody.businesses.length) {
                                response.jsonBody.businesses.forEach(business => {
                                    if (category === 'dayActivities') {
                                        business.category = category
                                        business.subcategory = subcategory
                                    } else if (category === 'nightActivities') {
                                        business.category = category
                                        business.subcategory = subcategory
                                    } else if (category === 'food') {
                                        business.category = category
                                        business.subcategory = subcategory
                                    }
                                })

                                finalResults = finalResults.concat(response.jsonBody.businesses)

                                // Cache the Yelp result
                                redisHelper.set(key, {
                                    results: response.jsonBody.businesses
                                })
                            }

                            searches++

                            if (searches === totalCategories) {
                                finalResults = helpers.removeDuplicates(finalResults, 'id')
                                finalResults = helpers.addProvider(finalResults, 'yelp')
                                return resolve(finalResults)
                            }
                        }).catch(e => {
                            console.log(e);
                        });
                    }
                })
            })
        })
    })

    function getSearchTerm(category, subcategory) {
        if (category === 'dayActivities') {
            return config.yelp.dayActivities[subcategory].term
        } else if (category === 'nightActivities') {
            return config.yelp.nightActivities[subcategory].term
        } else if (category === 'food') {
            return config.yelp.foodCategories[subcategory].term
        }
    }

    function getCategories(category, subcategory) {
        if (category === 'dayActivities') {
            return config.yelp.dayActivities[subcategory].categories
        } else if (category === 'nightActivities') {
            return config.yelp.nightActivities[subcategory].categories
        } else if (category === 'food') {
            return config.yelp.foodCategories[subcategory].categories
        }
    }
}

function getBusinessesInMoreDetail(businesses) {
    return new Promise((resolve, reject) => {
        if (!businesses || !businesses.length) return resolve([])

        let detailedResults = []
        let q = queue(function(task, callback) {
            getBusiness(task.id).then(function(result) {
                if (!result.hours) {
                    callback()
                } else {
                    result.category = task.category
                    result.subcategory = task.subcategory
                    detailedResults.push(formatBusinessResult(result))
                    callback()
                }
            })
        }, 1);

        businesses.forEach(business => q.push(business))

        q.drain = function() {
            return resolve(detailedResults)
        };
    })

    function getBusiness(id) {
        return new Promise((resolve, reject) => {
            YelpClient.business(id).then((response) => {
                return resolve(response.jsonBody)
            })
        })
    }

    function getReviews(id) {
        return new Promise((resolve, reject) => {
            YelpClient.reviews(id).then((response) => {
                return resolve(response.jsonBody.reviews)
            })
        })
    }

    /**
     * Formats the detailed result from the Google Places API
     * @param  {Object} The business returned
     * @return {Object} The formatted data from said business
     */
    function formatBusinessResult(business) {
        return {
            name: business.name,
            id: business.id,
            phone: business.display_phone,
            address: business.location.display_address.join(', '),
            location: getLocation(business),
            website: null,
            hours: getHours(business),
            reviews: business.reviews,
            photos: business.photos,
            price: YELP_PRICE_TO_DOUBLE[business.price],
            rating: business.rating,
            category: business.category,
            subcategory: business.subcategory
        }

        /**
         * Gets latitude and longitude of business
         * @param  {Object} The business
         * @return {Object} Lat and long
         */
        function getLocation(business) {
            return {
                lat: business.coordinates.latitude,
                long: business.coordinates.longitude,
                mapsUrl: formatMapsUrl(business.coordinates.latitude, business.coordinates.longitude)
            }

            function formatMapsUrl(lat, lng) {
                let latLngStr = lat + "," + lng
                return "https://maps.googleapis.com/maps/api/staticmap?center=" + latLngStr + "&markers=color:0x82CA75|" + latLngStr + "&zoom=15&size=300x150&scale=2&key=" + config.google.mapStaticApiKey
            }
        }

        /**
         * Gets hours for the business
         * @param  {Object} The business
         * @return {Object} hours
         */
        function getHours(business) {
            return {
                formattedHours: getFormattedHours(business.hours[0].open),
                individualDaysData: formatTime(business.hours[0].open)
            }
        }

        function formatTime(times) {
            let newTimes = []

            for (var day of times) {
                if (day.is_overnight) {
                    newTimes.push({
                        close: {
                            day: (day.day === 6) ? 0 : (day.day + 1),
                            time: day.end
                        },
                        open: {
                            day: day.day,
                            time: day.start
                        }
                    })
                } else {
                    newTimes.push({
                        close: {
                            day: day.day,
                            time: day.end
                        },
                        open: {
                            day: day.day,
                            time: day.start
                        }
                    })
                }
            }

            return newTimes
        }

        /**
         * Gets ids of photos that can be pulled from the client
         * @param  {Object} The business
         * @return {Array}  Array of photo IDs
         */
        function getPhotoIds(business) {
            if (!business.photos) return []
            return business.photos.map(photo => {
                return photo.photo_reference
            })
        }

        function getFormattedHours(days) {
            const DAYS = {
                0: 'Sunday',
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday'
            }

            let hourStrs = []
            days.forEach(day => {
                let open = moment(day.start, 'HH:mm').format('hh:mm a')
                let close = moment(day.end, 'HH:mm').format('hh:mm a')
                hourStrs.push(DAYS[day.day] + ', ' + open + ' - ' + close)
            })

            return hourStrs
        }
    }
}