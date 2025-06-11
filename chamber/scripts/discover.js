// discover.js - Handles the discover page functionality
// This file manages visit tracking using localStorage and dynamically loads business cards

/**
 * Initialize the discover page functionality
 * Main entry point that sets up all page features
 */
function init() {
	// Initialize visit tracking functionality
	initVisitTracking()

	// Load and display place cards
	loadPlaceCards()
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init)

/**
 * Initialize visit tracking using localStorage
 * Displays appropriate message based on visit history
 */
function initVisitTracking() {
	const visitMessageElement = document.getElementById('visit-message')
	const currentDate = new Date()
	const lastVisit = localStorage.getItem('discover-last-visit')

	if (!lastVisit) {
		// First visit - display welcome message
		visitMessageElement.textContent = 'Welcome! Let us know if you have any questions.'
		visitMessageElement.className = 'discover__visit-message discover__visit-message--welcome'
	} else {
		// Calculate days between visits
		const lastVisitDate = new Date(lastVisit)
		const timeDifference = currentDate - lastVisitDate
		const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

		if (daysDifference < 1) {
			// Less than a day - display "back so soon" message
			visitMessageElement.textContent = 'Back so soon! Awesome!'
			visitMessageElement.className = 'discover__visit-message discover__visit-message--frequent'
		} else {
			// More than a day - display days since last visit
			const dayText = daysDifference === 1 ? 'day' : 'days'
			visitMessageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`
			visitMessageElement.className = 'discover__visit-message discover__visit-message--returning'
		}
	}

	// Update localStorage with current visit date
	localStorage.setItem('discover-last-visit', currentDate.toISOString())
}

/**
 * Load places data from JSON file and create place cards
 * Uses fetch API to get data and dynamically creates HTML elements
 */
async function loadPlaceCards() {
	try {
		// Fetch places data from JSON file
		const response = await fetch('data/places.json')

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		const placeCardsContainer = document.getElementById('place-cards')

		// Clear loading message
		placeCardsContainer.innerHTML = ''

		// Create place cards for each place
		data.places.forEach((place, index) => {
			const placeCard = createPlaceCard(place, index)
			placeCardsContainer.appendChild(placeCard)
		})
	} catch (error) {
		console.error('Error loading places data:', error)
		// Display error message to user
		const placeCardsContainer = document.getElementById('place-cards')
		placeCardsContainer.innerHTML =
			'<p class="error-message">Unable to load places information. Please try again later.</p>'
	}
}

/**
 * Create a single place card element
 * @param {Object} place - Place data object
 * @param {number} index - Index for unique identification
 * @returns {HTMLElement} - Complete place card element
 */
function createPlaceCard(place, index) {
	// Create main card container with BEM naming
	const card = document.createElement('article')
	card.className = 'place-card'
	card.setAttribute('data-place-id', place.id)

	// Create card title (h2)
	const title = document.createElement('h2')
	title.className = 'place-card__title'
	title.textContent = place.title

	// Create figure element for image
	const figure = document.createElement('figure')
	figure.className = 'place-card__figure'

	// Create image element with lazy loading
	const image = document.createElement('img')
	image.className = 'place-card__image'
	image.src = place.image
	image.alt = `${place.title} landscape view`
	image.width = 300
	image.height = 200
	image.loading = 'lazy' // Performance optimization for mobile

	// Add image to figure
	figure.appendChild(image)

	// Create address element
	const address = document.createElement('address')
	address.className = 'place-card__address'
	address.textContent = place.address

	// Create description paragraph
	const description = document.createElement('p')
	description.className = 'place-card__description'
	description.textContent = place.description

	// Create "Learn More" button
	const button = document.createElement('button')
	button.className = 'place-card__button'
	button.textContent = 'Learn More'
	button.setAttribute('aria-label', `Learn more about ${place.title}`)

	// Assemble card components
	card.appendChild(title)
	card.appendChild(figure)
	card.appendChild(address)
	card.appendChild(description)
	card.appendChild(button)

	return card
}
