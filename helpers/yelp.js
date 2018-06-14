const moment = require('moment')
const yelp = require('yelp-fusion')
const queue = require('async/queue')
const helpers = require('./helpers')
const YelpClient = yelp.client(config.yelp.fusionApiKey);

module.exports = {
    findBusinesses: (data, required) => {
        return new Promise((resolve, reject) => {
            searchForBusinesses(data, required).then(results => {
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

function searchForBusinesses(data, required) {
    return new Promise((resolve, reject) => {
        let searches = 0
        let totalCategories = Object.keys(required).length
        let finalResults = []
        let lat = data.lat
        let long = data.long

        // Search
        Object.keys(required).forEach(activity => {
            let preference = required[activity].category + '-' + activity
            let key = redisHelper.getKey(lat, long, 'yelp', preference)
            console.log("checking this key in redis: ", key)

            redisHelper.get(key).then(cachedData => {
                if (cachedData) {
                    //@TODO: Check if cachedData length is enough. If not, get more
                    finalResults = finalResults.concat(cachedData.results)
                    searches++
                    if (searches === totalCategories) {
                        finalResults = helpers.removeDuplicates(finalResults, 'id')
                        finalResults = helpers.addProvider(finalResults, 'yelp')
                        return resolve(finalResults)
                    }
                } else {
                    console.log("fetching yelp for live business data...")
                    console.log("using this term: ", getYelpConfigDataByKey(activity, 'term'))
                    console.log("and this category: ", getYelpConfigDataByKey(activity, 'categories'))
                    YelpClient.search({
                        term: getYelpConfigDataByKey(activity, 'term'),
                        categories: getYelpConfigDataByKey(activity, 'categories'),
                        latitude: lat,
                        longitude: long,
                        sortBy: 'rating',
                        limit: required[activity].count,
                        radius: helpers.milesToRadius(data.radius)
                    }).then(response => {
                        console.log("got this many live from yelp: ", response.jsonBody.businesses.length)
                        if (response.jsonBody.businesses.length) {
                            response.jsonBody.businesses.forEach(business => {
                                business.category = required[activity].category
                                business.subcategory = activity
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
                        console.log("error from yelp: ", e)
                    });
                }
            })
        })
    })

    function getYelpConfigDataByKey(activity, key) {
        if (required[activity].category === 'day') {
            return config.yelp.dayActivities[activity][key]
        } else if (required[activity].category === 'night') {
            return config.yelp.nightActivities[activity][key]
        } else if (required[activity].category === 'food') {
            return config.yelp.foodCategories[activity][key]
        }
    }
}

function getBusinessesInMoreDetail(businesses) {
    console.log("In yelp - getting " + businesses.length + " businesses in more detail")
    return new Promise((resolve, reject) => {
        if (!businesses || !businesses.length) return resolve([])

        let detailedResults = []
        let q = queue(function(task, callback) {
            console.log("getting a yelp business")
            getBusiness(task.id).then(function(result) {
                if (!result.hours) {
                    callback()
                } else {
                    setTimeout(function() {
                        result.category = task.category
                        result.subcategory = task.subcategory
                        detailedResults.push(formatBusinessResult(result))
                        callback()
                    }, 150)
                }
            }).catch(e => {
                callback()
            })
        }, 2);

        businesses.forEach(business => q.push(business))

        q.drain = function() {
            return resolve(detailedResults)
        };
    })

    function getBusiness(id) {
        return new Promise(async (resolve, reject) => {
            let fetchedBusiness = await fetch(id)

            while(!fetchedBusiness){
                fetchedBusiness = await fetch(id)
            }

            return resolve(fetchedBusiness)

            function fetch(id) {
                return new Promise((resolve, reject) => {
                    YelpClient.business(id).then((response) => {
                        return resolve(response.jsonBody)
                    }).catch(error => {
                        return resolve(error)
                    })
                })
            }
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
            description: formatDescription(),
            id: business.id,
            phone: business.display_phone,
            address: business.location.display_address.join(', '),
            location: getLocation(business),
            mapsUrl: formatMapsUrl(business.coordinates.latitude, business.coordinates.longitude),
            website: null,
            hours: getHours(business),
            reviews: business.reviews,
            photos: business.photos,
            price: config.yelp.YELP_PRICE_TO_DOUBLE[business.price],
            rating: business.rating,
            category: business.category,
            subcategory: business.subcategory
        }

        function formatDescription() {
            return "Here is my description..."
        }

        /**
         * Gets latitude and longitude of business
         * @param  {Object} The business
         * @return {Object} Lat and long
         */
        function getLocation(business) {
            return {
                lat: business.coordinates.latitude,
                long: business.coordinates.longitude
            }
        }

        function formatMapsUrl(lat, lng) {
            let latLngStr = lat + "," + lng
            return "https://maps.googleapis.com/maps/api/staticmap?center=" + latLngStr + "&markers=color:0x82CA75|" + latLngStr + "&zoom=15&size=300x150&scale=2&key=" + config.google.mapStaticApiKey
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