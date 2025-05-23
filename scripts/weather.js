// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp')
const weatherIcon = document.querySelector('#weather-icon')
const captionDesc = document.querySelector('figcaption')

// URL for the API
const url =
	'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=&units=imperial'

// fetch the data
async function apiFetch() {
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			console.log(data)
			displayResults(data)
		} else {
			throw new Error(await response.text())
		}
	} catch (error) {
		console.log(error)
	}
}

function displayResults(data) {
	currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`
	const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
	let desc = data.weather[0].description
	weatherIcon.setAttribute('src', iconsrc)
	weatherIcon.setAttribute('alt', desc)
	captionDesc.textContent = `${desc}`
}

apiFetch()
