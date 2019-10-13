var fs = require('fs'); 
//var parse = require('csv-parser');
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const depth= require('./utils/depth')
const scrape = require('./utils/scrape')
const request = require('request');
const cheerio = require('cheerio');
//var fs=require("fs")


const app = express()
const port = process.env.PORT || 3000

// Read flood.csv and store the addresses in a array

var dict={}
var maindict={}
for(i=0;i<10;i++)
{
     dict[i]=[]
}
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath) 
hbs.registerPartials(partialPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
     res.render('index', {
          title: 'Weather',
          name: 'Yash Sharma'
     }) 
})

app.get('/about', (req, res) => {
     res.render('about', {
          title: 'About me',
          name: 'Yash Sharma'
     }) 
})

app.get('/help', (req, res) => {
     res.render('help',{
          helpText: 'Anything for help!', 
          title: 'Help',
          name: 'Yash Sharma'
     })
})
var len=0
app.get('/weather',(req, res) => {
     
     if(!req.query.address) {
          return res.send({
               error: 'You must provide an address!'
          })
     }
     //pranay code go here he will get req.queryaddress and then will generate a csv file
        var Floodreport = []
        var resarray = []


        
//code for scraping starts
const scrape = (city) => {
     return new Promise( (resolve,reject) => {
         //const city = 'indore';
         city = city.toLowerCase()
         const url = 'https://www.mapsofindia.com/'+city+'/localities/';
         console.log(url)
         request(url,(error,response,html) => {
             if(!error && response.statusCode==200)
             {
                 const $ = cheerio.load(html);
                     $('.intrl_links a').each((i,el) => {
                             const item = $(el).text();
                             Floodreport.push(item)
                     });
                 if(Floodreport.length==0)
                 {
                     console.log('empty array');
                     reject('no regions found')
                 }
                 else
                 {
                     console.log(Floodreport)
                     resolve()
                 }
             }
         });
     })
 }

//code for scraping ends



//code for recursion starts

const recursion = ((i) => {
     return new Promise((resolve,reject) => {
       console.log(i);
       if(i==len)
       {
           //console.log(dict)
          //  console.log(resarray)
          resarray.sort(sortFunction)
          console.log(resarray)
//           res.send('OK')
           return resolve(i)
       }
       setTimeout(() => {
           geocode(Floodreport[i]).then(({latitude, longitude, location}={}) => 
           {
               console.log(i)
            console.log('geocode function')
               //dict[i].push({latitude,longitude})
               console.log({latitude,longitude})
                depth(latitude, longitude).then((DepthData) => {
                     if(!DepthData){
                          console.log("lol")  
                     }
                     //console.log(DepthData)
                     console.log('depth function')
                 //    dict[i].push(DepthData)
                     resarray.push([DepthData,Floodreport[i]])
                     console.log(DepthData)
                    recursion(++i)
                }).catch((error) => {
                    console.log(error);
                })
           }).catch((error) => {
                console.log(error)
           })                  
       },500)
     })
 })

//code for recursion ends

//code for sorting starts


// a.sort(sortFunction);
// console.log(a)
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

//code for sorting ends











     scrape(req.query.address).then(() => {
          len = Floodreport.length
          console.log(recursion(0));
          recursion(0).then(() => {
               console.log('hiiiii')
               resarray.sort(sortFunction)
               console.log(resarray)
          }).catch((error) => {

               console.log((error))
          })
     }).catch((error) => {
          console.log(error)
     })
     




//function to render data n html page
          res.send({
               
               //console.log(dict)
               // forecast: Floodreport,
               // location,
               // address: 'Indore'
          })

 //end of app.get()         
     })

//console.log(lol1)
//console.log(lol2)

app.get('*/products', (req,res) => {
     if(!req.query.search) {
          return res.send({
               error: 'You must provide a search term'
          })
     }  

     console.log(req.query.search)
     res.send({
          products: []
     })
})

app.get('/help/*', (req, res) => {
     res.render('404', {
          title: '404',
          name: 'Brogrammer',
          errorMessage: 'Help article not found'
     })
})

app.get('*', (req, res) => {
     res.render('404', {
          title: '404',
          name: 'Brogrammer', 
          errorMessage: 'Page not found'
     })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})