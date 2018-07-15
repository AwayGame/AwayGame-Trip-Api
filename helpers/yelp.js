const google = require('google')
google.resultsPerPage = 1

const moment = require('moment')
const yelp = require('yelp-fusion')
const queue = require('async/queue')
const helpers = require('./helpers')
const YelpClient = yelp.client(config.yelp.fusionApiKey);
const async = require('async')
const { GraphQLClient } = require('graphql-request')
const { jsonToGraphQLQuery } = require('json-to-graphql-query');
const graphQLParser = require('json-graphql');

const YelpGraphQlClient = new GraphQLClient(config.yelp.yelpGraphQlApiUrl, {
    headers: {
        Authorization: "Bearer " + config.yelp.fusionApiKey,
    }
})

module.exports = {
    findBusinesses: (data, required) => {
        return new Promise((resolve, reject) => {
            searchForBusinesses(data, required).then(results => {
                return resolve(results)
            }).catch(e => {
                return reject(e)
            })
        })
    },
    getMoreDetails: (businesses) => {
        return new Promise((resolve, reject) => {
            getBusinessesInMoreDetail(businesses).then(detailedBusinesses => {
                return resolve(detailedBusinesses)
            }).catch(e => {
                return reject(e)
            })
        })
    }
}

function searchForBusinesses(data, required) {
    return new Promise((resolve, reject) => {
        let searches = 0
        let totalCategories = Object.keys(required).length
        let finalResults = []
        let lat = data.lat
        let long = data.long

        let requestObjects = Object.keys(required).map(activity => {
            let preference = required[activity].category + '-' + activity

            return {
                preference: preference,
                key: redisHelper.getKey(lat, long, 'yelp', preference),
                activity: activity
            }
        })

        let q = queue(function(task, callback) {
            redisHelper.get(task.key).then(cachedData => {
                if (cachedData) {
                    logger.info("(from cache) We got " + cachedData.results.length + " result(s) from Yelp for category: ", task.activity)
                    logger.info("we needed " + required[task.activity].count)
                    finalResults = finalResults.concat(cachedData.results)
                    callback()
                } else {
                    if (task.preference.indexOf('game') > -1) {
                        return callback()
                    }
                    // If the key is famous sights, then use 8 miles for the radius
                    let radius = (task.activity === 'famousSights') ? helpers.milesToRadius('8.0') : helpers.milesToRadius(data.radius)
                    YelpClient.search({
                        term: getYelpConfigDataByKey(task.activity, 'term'),
                        categories: getYelpConfigDataByKey(task.activity, 'categories'),
                        latitude: lat,
                        longitude: long,
                        sortBy: 'rating',
                        limit: 30,
                        radius: helpers.milesToRadius(data.radius)
                    }).then(response => {
                        logger.info("We got " + response.jsonBody.businesses.length + " result(s) from Yelp for category: ", task.activity)
                        logger.info("we needed " + required[task.activity].count)
                        response.jsonBody.businesses.forEach(business => {
                            business.category = required[task.activity].category
                            business.subcategory = task.activity
                        })

                        finalResults = finalResults.concat(response.jsonBody.businesses)
                        // Cache the Yelp result
                        redisHelper.set(task.key, {
                            results: response.jsonBody.businesses
                        })
                        callback()
                    }).catch(e => {
                        logger.error("error from yelp: ", e)
                        callback()
                    });
                }
            })
        }, 2)


        requestObjects.forEach(obj => q.push(obj))

        q.drain = function() {
            logger.info("queue has been drained")
            finalResults = helpers.removeDuplicates(finalResults, 'id')
            finalResults = helpers.addProvider(finalResults, 'yelp')
            return resolve(finalResults)
        }
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
    let count = 0
    logger.info("In yelp - getting " + businesses.length + " businesses in more detail")
    return new Promise((resolve, reject) => {
        if (!businesses || !businesses.length) return resolve([])

        // Graph QL
        //let ids = businesses.map(b => b.id)
        //let query = formatGraphQlQUery(ids)
        // console.time("time to get data")
        // YelpGraphQlClient.request(query).then(data => {
        //     console.timeEnd("time to get data")
        //     console.log(data)
        // })

        let detailedResults = []
        let q = queue(function(task, callback) {
            getBusiness(task.id).then(function(result) {
                count++

                if (!result.hours) {
                    logger.info("business didn't have hours!")
                    callback()
                } else {
                    setTimeout(function() {
                        logger.info("we've now gotten this many: " + count)
                        result.category = task.category
                        result.subcategory = task.subcategory
                        detailedResults.push(formatBusinessResult(result))
                        callback()
                    }, 125)
                }
            }).catch(e => {
                logger.error("error geting business: ", e)
                callback()
            })
        }, 2);

        businesses.forEach(business => q.push(business))

        q.drain = function() {
            logger.info("Exiting the Yelp queue....")
            return resolve(detailedResults)
        }
    })

    function getBusiness(id) {
        return new Promise(async(resolve, reject) => {
            let fetchedBusiness = await fetch(id)

            while (!fetchedBusiness) {
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
     * Formats the detailed result from Yelp
     * @param  {Object} The business returned
     * @return {Object} The formatted data from said business
     */
    function formatBusinessResult(business) {
        return new Promise((resolve, reject) => {
            getDescription(business).then(description => {
                let detailedBusiness = {
                    name: business.name,
                    description: description,
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
                    subcategory: business.subcategory,
                    provider: 'yelp'
                }

                return resolve(detailedBusiness)
            })
        })

        function getDescription(business) {
            return new Promise((resolve, reject) => {
                let searchTerm = business.name + " " + business.location.display_address.join(', ')

                google(searchTerm, function(err, res) {
                    if (err) {
                        logger.error("error getting description: ", err)
                        return resolve("No description available")
                    }

                    var description = res.$('.DjxOn').text().trim();
                    if (!description.length) {
                        description = res.$('.oTDgte').text().trim()
                    }
                    return resolve(description)
                })
            })
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
            return "https://maps.googleapis.com/maps/api/staticmap?center=" + latLngStr + "&markers=color:0x01AF66|" + latLngStr + "&zoom=15&size=300x150&scale=2&key=" + config.google.mapStaticApiKey
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


function formatGraphQlQUery(ids) {
    let query = {}

    ids.forEach((id, index) => {
        query['b' + index] = {
            "$": {
                "_": "business",
                "id": id
            },
            name: true,
            photos: true
        }
    })

    return graphQLParser.stringify(query)
}