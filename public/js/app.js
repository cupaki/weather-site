console.log('Client side js file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.forecastData//console.log(data.forecastData)
                    messageTwo.textContent = data.location//console.log(data.location)
                }
            })
        })
    })