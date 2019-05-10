const request = require('request')
const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhbmF5MTIzIiwiYSI6ImNqdmYyMzBuYTJwamo0YW1lZ3RvcDd4b28ifQ.PiWSlYoV1nNQ7PNTuU4Zww&limit=1'    
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(body.features.length===0){
            callback('unable to find location. try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode