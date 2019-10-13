const request = require('request')
const forecast = (latitude, longitude) => {
    return new Promise((resolve,reject) => {
        const url = 'https://api.darksky.net/forecast/53b72a104b7305cb5817bee0bba9fbdb/'+latitude +','+ longitude+'?units=si'

        request({url, json: true}, (error, {body}) => {
            if(error){
                reject('Unable to connect weather services!')
    //            callback('Unable to connect weather services!',undefined)
            }
            else if(body.error){
                reject('Unable to find location')
    //            callback('Unable to find location')
            }
            else{
                resolve(body.currently.precipProbability)
    //           callback(undefined,body.currently.precipProbability)
            }        
    })
})
}
//     const url = 'https://api.darksky.net/forecast/53b72a104b7305cb5817bee0bba9fbdb/'+latitude +','+ longitude+'?units=si'

//     request({url, json: true}, (error, {body}) => {
//         if(error){
//             PromiseRejectionEvent('Unable to connect weather services!')
// //            callback('Unable to connect weather services!',undefined)
//         }
//         else if(body.error){
//             PromiseRejectionEvent('Unable to find location')
// //            callback('Unable to find location')
//         }
//         else{
//             resolve(body.currently.precipProbability)
// //           callback(undefined,body.currently.precipProbability)
//         }
//     })
// })
// const forecast = (latitude, longitude,callback) => {
//     const url = 'https://api.darksky.net/forecast/53b72a104b7305cb5817bee0bba9fbdb/'+latitude +','+ longitude+'?units=si'

//     request({url, json: true}, (error, {body}) => {
//         if(error){
//             PromiseRejectionEvent('Unable to connect weather services!')
// //            callback('Unable to connect weather services!',undefined)
//         }
//         else if(body.error){
//             PromiseRejectionEvent('Unable to find location')
// //            callback('Unable to find location')
//         }
//         else{
//             resolve(body.currently.precipProbability)
// //           callback(undefined,body.currently.precipProbability)
//         }
//     })
// }
// forecast.then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = forecast