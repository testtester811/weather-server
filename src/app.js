const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const PUBLIC_DIRECTORY = path.join(__dirname, '../public')
const VIEWS_DIRECTORY = path.join(__dirname, '../templates/views')
const PARTIALS_DIRECTORY = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', VIEWS_DIRECTORY)
hbs.registerPartials(PARTIALS_DIRECTORY)

// Setup static directory
app.use(express.static(PUBLIC_DIRECTORY))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather app!', author: 'Random User'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About page!', author: 'Random User'})
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'HelpCenter', message: '24/7 Help is for your service!', author: 'Random User'})
})

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({ error: 'you must provide an address.' })
    }

    const forecast = geocode(address);
    res.send(forecast)
})

app.get('/help/*', (req, res) => {
    res.render('404', {  title: '404', author: 'Random User', '404Message': 'Help article not found' })
})

app.get('*', (req, res) => {
    res.render('404', {  title: '404', author: 'Random User', '404Message': 'Page not found' })
})

app.listen(port)
