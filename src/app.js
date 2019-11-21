const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath) //menja default view u template
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead index'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead about'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                location: location,
                address: req.query.address,
                forecastData: forecastData
            })

        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => { //zvezda mora poslednji get za stranicu
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Andrew Mead'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})