const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/6146ddffdbfddca90917672fe3f36c59/'+latitude+','+longitude
    request({url, json:true},(error,{ body }) => {
        if(error){
            callback('unable to connect to services',undefined)
        }
        else if(body.error){
           callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast