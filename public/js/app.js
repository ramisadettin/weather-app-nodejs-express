const formElement = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')
const weather_icon = document.getElementById("icon")


formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  message1.innerText = 'Loading ...'
  message2.innerText = ''
  weather_icon.src = ''
  fetch(`/weather?address=${address.value}`).then((response) => {
    response.json().then((data) => {

      if (data.error) {
        message1.innerText = data.error
      }
      else {
        message1.innerText = data.location
        message2.innerText = data.forecastMsg
        weather_icon.src = data.icon_URL
      }
    })
  })
})