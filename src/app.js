const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('views',viewPath)
app.set('view engine','hbs')//to let express know about the templating engine we are using using the hbs package
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('', (req,res) => {
//     res.send('<h1> Weather </h1>')
// }) //get method describes the value which needs to be return when someone accesses the website
 app.get('',(req,res) => {
     res.render('index',{
         title: 'weather app',
         name: 'pranay garg'

     }) //render allows to render one of our views
 })

 app.get('/about',(req,res) => {
     res.render('about',{
         title: 'about me',
         name: 'pranay garg'
     })
 })
 app.get('/help',(req,res) => {
    res.render('help',{
        helptext: "this is a help page",
        title: 'help page',
        name: 'pranay garg'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'address needs to be provided'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location} = {} ) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, {summary,temperature,precipProbability,temperatureHigh,temperatureLow} = {} ) => {
            if(error)
                return res.send({
                    error: error
                })
            res.send({
                address: req.query.address,
                summary: summary,
                temperature: temperature,
                precipProbability: precipProbability,
                temperatureHigh,
                temperatureLow

            })
          })
    })
    // res.send({
    //     address: req.query.address
    // })
})  

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    //console.log(req.query) //the query made in the browser is available through req.query.key 
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Pranay garg',
        errormessage: 'help page not found'
    })
})
app.get('*',(req,res) => {//* is the wild card character
    res.render('404',{
        title: '404',
        name: 'pranay garg',
        errormessage: 'page not found'
    })
})

//app.com
//app.com/help

app.listen(port,() => {
    console.log('Server is up on port '+port)
}) //to start the server