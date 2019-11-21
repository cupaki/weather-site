const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/58371e4ae779d8d63fb61b9173066571/' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude)
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'Current temperature: ' + body.currently.temperature + ' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast