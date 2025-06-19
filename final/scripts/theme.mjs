/**
 * Simple Theme Management
 * Handles light/dark theme switching with proper icons
 */

// Get theme elements
const themeToggle = document.getElementById('themeToggle')
const html = document.documentElement

// Load saved theme or use light as default
function loadTheme() {
	const savedTheme = localStorage.getItem('theme') || 'light'
	html.setAttribute('data-theme', savedTheme)
	updateIcons(savedTheme)
}

// Save theme to localStorage
function saveTheme(theme) {
	localStorage.setItem('theme', theme)
}

// Update theme icons based on current theme
function updateIcons(theme) {
	const sunIcons = document.querySelectorAll('.theme-toggle__icon--sun')
	const moonIcons = document.querySelectorAll('.theme-toggle__icon--moon')

	// Update sun icons
	sunIcons.forEach(function (icon) {
		icon.src = `images/icon-sun-${theme}.svg`
	})

	// Update moon icons
	moonIcons.forEach(function (icon) {
		icon.src = `images/icon-moon-${theme}.svg`
	})
}

// Toggle between light and dark theme
function toggleTheme() {
	const currentTheme = html.getAttribute('data-theme')
	const newTheme = currentTheme === 'light' ? 'dark' : 'light'

	html.setAttribute('data-theme', newTheme)
	updateIcons(newTheme)
	saveTheme(newTheme)
}

// Initialize theme
function initTheme() {
	loadTheme()

	if (themeToggle) {
		themeToggle.addEventListener('click', toggleTheme)
	}
}

// Export the init function
export { initTheme }
