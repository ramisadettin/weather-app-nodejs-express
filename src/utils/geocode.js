const request = require('postman-request')

const geocode = (address, callback) => {

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFtaTk0IiwiYSI6ImNrd294cmo3aDA3Z2gybm5xYTE5dTB0YWcifQ.PG2RsgOfsiOURajaYiwVYg&limit=1`

  request({ url, json: true }, (error, { body }) => { //Es6 shorthand also we have destructuring , instead of response we write {body}
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else {
      if (body.features.length === 0) {
        callback('Unable to find location. Try another search', undefined)
      } else {
        const place = body.features[0]
        const location = place.place_name
        const latitude = place.center[1]
        const longitude = place.center[0]
        const data = {   //object shorthand Es6
          location,
          latitude,
          longitude
        }
        callback(undefined, data)
      }
    }
  })

}

module.exports = geocode