const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWFzaDI5MDQiLCJhIjoiY2p2Zm9yZW9tMGQxczRicGdqeWNnZXIyOCJ9.qu-TMhMg6kKX7EygKnp-Dg&limit=1'
    
//     request({url, json: true}, (error, {body}) => {
//          if(error){
//             callback('Unable to connect to location services!',undefined)
//          }
//          else if(body.features.length === 0){
//              callback('Unable to find location. Try another search.',undefined)
//          }
//          else{
//             callback(undefined,{
//                latitude: body.features[0].center[1],
//                longitude: body.features[0].center[0],
//                location: body.features[0].place_name
//             })
//          }
//     })
//  }
const geocode = (address) => {
   return new Promise((resolve,reject) => {
     // i46qeO17P9jnBZBr0kKWSM9ZiG3CykwA
//      http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=Washington,DC
      // const url = 'http://open.mapquestapi.com/geocoding/v1/address?key=i46qeO17P9jnBZBr0kKWSM9ZiG3CykwA&location='+ encodeURIComponent(address) //+'.json?access_token=pk.eyJ1IjoieWFzaDI5MDQiLCJhIjoiY2p2Zm9yZW9tMGQxczRicGdqeWNnZXIyOCJ9.qu-TMhMg6kKX7EygKnp-Dg&limit=1'

      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhbmF5MTIzIiwiYSI6ImNqdmYyMzBuYTJwamo0YW1lZ3RvcDd4b28ifQ.PiWSlYoV1nNQ7PNTuU4Zww&limit=1' 
      request({url, json: true}, (error, {body}) => {
           if(error){
              reject('Unable to connect to location services!')
           }
           else if(body.features.length === 0){
               reject('Unable to find location. Try another search.')
           }
           else{
              resolve({
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
              })
           }
      })
   })
}

module.exports = geocode