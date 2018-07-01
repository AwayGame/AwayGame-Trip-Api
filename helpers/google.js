const helpers = require('./helpers')
const GoogleMapsClient = require('@google/maps').createClient({
    key: config.google.placesApiKey
});

module.exports = {
    findBusinesses: async(data, required) => {
        return new Promise((resolve, reject) => {
            let queryObjects = getQueryData(data, required)
            getBusinesses(queryObjects, required).then((businesses) => {
                return resolve(businesses)
            })
        })
    },
    getMoreDetails: async(businesses) => {
        console.log("in Google. Getting more details for this many: ", businesses.length)
        return new Promise((resolve, reject) => {
            console.time("Time to get details for Google")
            getBusinessesInMoreDetail(businesses).then(detailedBusinesses => {
                console.timeEnd("Time to get details for Google")
                console.log("got more details")
                return resolve(detailedBusinesses)
            }).catch(err => {
                console.log("error getting details in google: ", err)
            })
        })
    }
}

function getBusinesses(queryObjects, required) {
    return new Promise((resolve, reject) => {
        let results = []
        let totalRequests = 0

        queryObjects.forEach(queryObject => {
            if (!queryObject) {
                totalRequests++
                if (totalRequests === queryObjects.length) {
                    results = helpers.removeDuplicates(results, 'name')
                    results = helpers.removeDuplicates(results, 'place_id')
                    results = helpers.addProvider(results, 'google')

                    // If there are no opening hours, remove
                    results = helpers.removeIfNoValueByKey(results, 'opening_hours')

                    return resolve(results)
                }
            } else {
                let amountToFetch = required[queryObject.subcategory].count

                getBusinessesFromGoogle(queryObject, amountToFetch).then(response => {
                    console.log("got " + response.length + " result(s) for query ", queryObject.data.query)
                    console.log("We needed this many: ", amountToFetch)
                    response.forEach(result => {
                        result.id = result.place_id
                        results.push(result)
                    })

                    totalRequests++
                    if (totalRequests === queryObjects.length) {
                        results = helpers.removeDuplicates(results, 'name')
                        results = helpers.removeDuplicates(results, 'place_id')
                        results = helpers.addProvider(results, 'google')

                        // If there are no opening hours, remove
                        results = helpers.removeIfNoValueByKey(results, 'opening_hours')

                        return resolve(results)
                    }
                })
            }
        })
    })

    function getBusinessesFromGoogle(queryObject, amountToFetch) {
        return new Promise((resolve, reject) => {
            let results = []

            makeRequests(queryObject, results)

            async function makeRequests(googleRequestObject, results) {
                let lat = googleRequestObject.data.location[0]
                let long = googleRequestObject.data.location[1]
                let preference = googleRequestObject.data.query.split(' ').join('-')
                let key = redisHelper.getKey(lat, long, 'google', preference)
                let cachedData = await redisHelper.get(key)

                if (cachedData) {
                    return resolve(cachedData.results)
                } else {
                    GoogleMapsClient.places(googleRequestObject.data, function(err, response) {
                        if (!err) {
                            response.json.results.forEach(business => {
                                business.category = googleRequestObject.category
                                business.subcategory = googleRequestObject.subcategory
                                results.push(business)
                            })

                            if (response.json.next_page_token && results.length < amountToFetch) {
                                googleRequestObject.data.pagetoken = response.json.next_page_token
                                setTimeout(function() {
                                    makeRequests(googleRequestObject, results)
                                }, 2500)
                            } else {
                                // save this into cache for the next request
                                redisHelper.set(key, {
                                    results: results
                                }).then(cacheResult => {
                                    return resolve(results)
                                })
                            }
                        } else {
                            console.log("we got an error...: ", err)
                        }
                    })
                }
            }
        })
    }
}

function getQueryData(data, required) {
    return Object.keys(required).map(activity => {
        // If the key is famous sights, then use 8 miles for the radius
        let radius = (activity === 'famousSights') ? helpers.milesToRadius('8.0') : helpers.milesToRadius(data.radius)

        let baseObject = {
            location: [data.lat, data.long],
            radius: radius,
            language: 'en'
        }

        switch (required[activity].category) {
            case 'food':
                return formatFoodObject(baseObject, activity)
                break;
            case 'day':
                return formatDayObject(baseObject, activity)
                break;
            case 'night':
                return formatNightObject(baseObject, activity)
                break;
        }
    })


    function formatFoodObject(baseObject, activity) {
        let objToReturn = baseObject
        objToReturn.type = 'restaurant'
        objToReturn.query = config.google.foodCategories[activity]

        return {
            data: objToReturn,
            category: 'food',
            subcategory: activity
        }
    }

    function formatDayObject(baseObject, activity) {
        let objToReturn = baseObject
        objToReturn.query = config.google.dayActivities[activity]
        return {
            data: objToReturn,
            category: 'day',
            subcategory: activity
        }

    }

    function formatNightObject(baseObject, activity) {
        let objToReturn = baseObject
        objToReturn.query = config.google.nightActivities[activity]
        return {
            data: objToReturn,
            category: 'night',
            subcategory: activity
        }
    }
}

async function getBusinessesInMoreDetail(businesses) {
    return new Promise((resolve, reject) => {
        let detailedResults = []
        businesses.forEach(business => {
            let url = config.google.getBusinessInMoreDetailUrl
            url += 'placeid=' + business.place_id + '&key=' + config.google.placesApiKey
            axios.get(url).then(response => {
                if (response.data.result) {
                    response.data.result.category = business.category
                    response.data.result.subcategory = business.subcategory

                    let detailedBusiness = formatBusinessResult(response.data.result)
                    detailedResults.push(detailedBusiness)

                    //Check to see if we're done
                    if (detailedResults.length === businesses.length) {
                        // If there are no opening hours, remove
                        detailedResults = helpers.removeIfNoValueByKey(detailedResults, 'hours')
                        return resolve(detailedResults)
                    }
                } else {
                    //handle error here...
                    console.log("error getting googld full: ", response)
                }
            }).catch(err => {

            })
        })
    })

    /**
     * Formats the detailed result from the Google Places API
     * @param  {Object} The business returned
     * @return {Object} The formatted data from said business
     */
    function formatBusinessResult(business) {
        return {
            name: business.name,
            description: formatDescription(),
            placeId: business.place_id,
            phone: business.formatted_phone_number,
            address: business.formatted_address,
            location: getLocation(business),
            website: business.website,
            hours: getHours(business),
            reviews: business.reviews,
            photos: getPhotoIds(business),
            price: business.price_level,
            rating: business.rating,
            category: business.category,
            subcategory: business.subcategory,
            mapsUrl: formatMapsUrl(business.geometry.location.lat, business.geometry.location.lng),
            provider: 'google'
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
                lat: business.geometry.location.lat,
                long: business.geometry.location.lng
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
            if (!business.opening_hours || !business.opening_hours.periods) {
                return undefined
            }

            return {
                formattedHours: business.opening_hours.weekday_text,
                individualDaysData: business.opening_hours.periods
            }
        }

        /**
         * Gets ids of photos that can be pulled from the client
         * @param  {Object} The business
         * @return {Array}  Array of photo IDs
         */
        function getPhotoIds(business) {
            if (!business.photos) return []
            return business.photos.map(photo => {
                return config.google.photosUrl + "?key=" + config.google.placesApiKey + "&photoreference=" + photo.photo_reference + "&maxwidth=400"
            })
        }
    }
}