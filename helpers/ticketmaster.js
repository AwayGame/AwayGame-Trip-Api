module.exports = {
    getGameDetails: (id) => {
        return new Promise((resolve, reject) => {
            let url = config.ticketMasterApi.eventDetailsId + id + '?apikey=' + config.ticketMasterApi.clientId
            axios.get(url).then(result => {
                if(result.status === 200) {
                    console.log("got the data: ", JSON.stringfy(result.data))
                    return resolve(result.data)
                } else {
                    console.log("error fetching from ticketmaster: ", result)
                    reject(result)
                }
            })
        })
    }
}