// Home Page JavaScript
// Author: Sam Bonfanti
// Handles API data fetching and display for the chamber home page

// API URLs
const weatherUrl =
	'https://api.openweathermap.org/data/2.5/weather?lat=33.6292&lon=-112.3679&appid=a7fce593ad6d2cb859c8583cff11ec93&units=imperial'
const membersUrl = 'data/members.json'

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
	apiFetch(weatherUrl, 'weather')
	apiFetch(membersUrl, 'members')
})

/**
 * Fetch data from API and display results
 * @param {string} url - API endpoint URL
 * @param {string} type - Type of data ('weather' or 'members')
 */
async function apiFetch(url, type) {
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			displayResults(data, type)
		} else {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
	} catch (error) {
		console.log(`Error fetching ${type} data:`, error)
	}
}

/**
 * Display API results in the DOM
 * @param {Object} data - Data returned from API
 * @param {string} type - Type of data ('weather' or 'members')
 */
function displayResults(data, type) {
	if (type === 'weather') {
		// Update current temperature
		const currentTemp = document.querySelector('.weather__current-temp')
		if (currentTemp) {
			currentTemp.textContent = `${Math.round(data.main.temp)}°F`
		}

		// Update weather description
		const description = document.querySelector('.weather__description')
		if (description) {
			description.textContent = data.weather[0].description
		}

		// Update weather icon - use local icon instead of external OpenWeatherMap
		const weatherIcon = document.querySelector('.weather__icon img')
		if (weatherIcon) {
			// Use local weather icon to avoid cross-site cookie issues
			weatherIcon.src = 'images/weather_day_sandstorm_icon.svg'
			weatherIcon.alt = data.weather[0].description
		}

		// Update weather details
		const weatherValues = document.querySelectorAll('.weather__value')
		if (weatherValues.length >= 4) {
			// High/Low temperatures
			weatherValues[0].textContent = `${Math.round(data.main.temp_max)}°F / ${Math.round(data.main.temp_min)}°F`
			// Humidity
			weatherValues[1].textContent = `${data.main.humidity}%`
			// Sunrise
			const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
			weatherValues[2].textContent = sunriseTime
			// Sunset
			const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
			weatherValues[3].textContent = sunsetTime
		}
	} else if (type === 'members') {
		// Display 3 random member spotlights
		const randomMembers = data.members.sort(() => Math.random() - 0.5).slice(0, 3)
		const spotlightGrid = document.querySelector('.spotlights__grid')

		if (spotlightGrid) {
			spotlightGrid.innerHTML = ''

			randomMembers.forEach((member) => {
				const article = document.createElement('article')
				article.className = 'spotlight-card'
				article.innerHTML = `
					<div class="spotlight-card__image">
						<img src="${member.image}" alt="${member.name} logo" width="300" height="200">
					</div>
					<div class="spotlight-card__content">
						<h3 class="spotlight-card__title">${member.name}</h3>
						<p class="spotlight-card__membership">${member.membershipLevel} Member</p>
						<div class="spotlight-card__contact">
							<p class="spotlight-card__phone">${member.phone}</p>
							<p class="spotlight-card__address">${member.address}</p>
						</div>
						<a href="${member.website}" class="spotlight-card__website" target="_blank" rel="noopener">Visit Website</a>
					</div>
				`
				spotlightGrid.appendChild(article)
			})
		}
	}
}
