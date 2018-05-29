const redis = require('redis');
const REDIS_URL = config.redis.host
const flatten = require('flat');
const unflatten = require('flat').unflatten;
let client

if (config.environment === 'production') {
    client = redis.createClient({
        host: REDIS_URL,
        port: config.redis.port
    });
} else {
    client = redis.createClient();
}

client.on('connect', () => {
    console.log(`connected to redis`);
});

client.on('error', err => {
    console.log(`Error: ${err}`);
});

module.exports = {
    set: (key, jsonObj) => {
    	return new Promise((resolve, reject) => {
	        let obj = JSON.stringify(flatten(jsonObj, {
	        	safe: true
	        }))
	        client.set(key, obj, 'EX', config.redis.TTL, function(err, result) {
	        	if (result) {
	                resolve(result)
	            } else if (!err) {
	                resolve(null)
	            } else {
	                reject(err)
	            }
	        })
    	})
    },
    get: (key) => {
    	return new Promise((resolve, reject) => {
	        client.get(key, function(err, result) {
	            if (result) {
	                resolve(JSON.parse(unflatten(result), {
	                	object: true
	                }))
	            } else if (!err) {
	                resolve(null)
	            } else {
	                reject(err)
	            }
	        })
    	})
    },
    getKey: (lat, long, provider, preference) => {
    	return [lat, long, provider, preference].join('-')
    }
}