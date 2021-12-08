const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  url = `http://api.weatherstack.com/current?access_key=066fc0898eaeb29d3760380af54b0744&query=${latitude},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else {
      if (body.error) {
        callback('Unable to find location', undefined)
      } else {
        const find = body.current
        const desc = find.weather_descriptions[0]
        const temp = find.temperature
        const feelslike = find.feelslike
        const windSpeed = find.wind_speed
        const humidity = find.humidity
        const observTime = find.observation_time
        const icon_URL = find.weather_icons[0]
        const data = {
          desc,
          temp,
          feelslike,
          windSpeed,
          humidity,
          observTime,
          icon_URL
        }
        callback(undefined, data)
      }
    }
  })
}

module.exports = forecast