//call a core module path 
const path = require('path')

// after installing the npm express we use it here
const express = require('express')

// we load hbs to use it for partials 
const hbs = require('hbs')

// express is a function that returns an object that we will use.
const app = express()

const geocode = require('./utils/geocode')

const forecast = require('./utils/weather')

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup Handlebars engine and views and partials paths 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//specifying a port for heroku to use if any problems occur port 3000 will be used
const port = process.env.PORT || 3000   


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    owner: 'Rami Saad Al Deen'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    owner: 'Rami Saad Al Deen'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    mTitle: 'This is the help page',
    mBody: 'follow me on github for further details lagger94hub ',
    title: 'Help',
    owner: 'Rami Saad Al Deen'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Error!! no address was provided'
    })
  }
  geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, { desc, temp, feelslike } = {}) => {
      if (error) {
        return res.send({
          error
        })
      }
      const forecastMsg = `${desc}: The temperature is : ${temp} degrees and it feels like:${feelslike} degrees `
      res.send({
        location,
        forecastMsg
      })

    })
  })

})



app.get('/help/*', (req, res) => {
  res.render('page404', {
    owner: 'Rami Saad Al Deen',
    title: 'Error',
    error: "Help page was not found"
  })
}) // here a help page subpage not found 

app.get('*', (req, res) => {
  res.render('page404', {
    owner: 'Rami Saad Al Deen',
    title: 'Error',
    error: 'Page was not found'
  })
})  // we have to add this at the end of route's list




app.listen(port, () => {
  console.log('server is up on port 3000')
})