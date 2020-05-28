const request=require('request')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const path = require('path')
const port=process.env.PORT || 3000
const express = require('express')
const hbs = require('hbs')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aswin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aswin'
    })
})

app.get('/product', (req, res) => {
	if(!req.query.search)
	{
		return res.send({
           error:'you must write address'
		})
	}

    console.log(req.query)
    res.send({
    	product:[]
    })
})

app.get('/weather', (req, res) => {
	if(!req.query.address)
	{
		return res.send({
           error:'please write address'
		})
	}
	geocode(req.query.address,(error,{lat,long,loc}={} )=>
{
	if(error)
	{
	     return res.send({
           error:'service is not available'
		})
	}
	forecast(lat,long, (error, forecastdata) => {
		if(error)
		{
			 return res.send({
           error:'service is not available'
		})
			
		}
		res.send({
    	location:loc,
    	forecast:forecastdata
    })
    
})

})
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Aswin'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'India'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aswin',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aswin',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})