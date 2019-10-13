const request = require('request')
//console.log("lol")
const depth =(latitude, longitude) => {
    return new Promise((resolve,reject) => {
        //console.log(longitude)
        const key = 'SsXUlNjnPT6vGyD8nCn1qfcTJAyTP9mbvztH19N9nl5X5xbNmPqa6f7L2BhbWA9u'
        const url = 'https://api.jawg.io/elevations?locations='+latitude+','+longitude+'&access-token='+key
        request({url, json: true}, (error, body) => {
            //console.log(body)
            if(error){
                reject('Unable to connect weather services!')
            }
            else if(!body.body[0]){
                resolve(0)
            }
            else{
                resolve(body.body[0].elevation)
            }
        })
    })
}

module.exports = depth