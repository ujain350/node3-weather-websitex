const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars and views path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Utsav Jain'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Utsav Jain'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help?',
        name: 'Utsav Jain'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide the Address'
        })
    }
    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.Latitude,data.Longitude, (error, forcastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            return res.send({
                Address: data.Location,
                Forcast: forcastData
            })

          })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help articles not found', 
        name: 'Utsav Jain'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Utsav Jain'
    })
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})