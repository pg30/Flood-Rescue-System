const request = require('request');
const cheerio = require('cheerio');
const scrape = (city) => {
    return new Promise( (resolve,reject) => {
        //const city = 'indore';
        city = city.toLowerCase()
        const url = 'https://www.mapsofindia.com/'+city+'/localities/';
        //console.log(url)
        var arr = []
        var res = []
        request(url,(error,response,html) => {
            if(!error && response.statusCode==200)
            {
                const $ = cheerio.load(html);
                    $('.intrl_links a').each((i,el) => {
                            const item = $(el).text();
                            arr.push(item)
                    });
                if(arr.length==0)
                {
                    console.log('empty array');
                    reject('no regions found')
                }
                else
                {
                    console.log(arr)
                    resolve()
                }
            }
        });
    })
}
// scrape('indore').then(() => {

// }).catch((error) => {

// })
module.exports = scrape