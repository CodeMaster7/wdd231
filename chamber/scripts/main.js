const menuToggle = document.querySelector('.nav__toggle-menu')
const navMenu = document.querySelector('.nav')
const themeToggle = document.querySelector('.nav__toggle-theme')
const logo = document.querySelector('.header__logo')
const gridViewIcon = document.querySelector('#grid-view-btn img')
const listViewIcon = document.querySelector('#list-view-btn img')

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
	// Set current year
	const currentYearElement = document.getElementById('current-year')
	if (currentYearElement) {
		currentYearElement.textContent = new Date().getFullYear()
	}

	// Set last modified date
	const lastModifiedElement = document.getElementById('last-modified')
	if (lastModifiedElement) {
		// Simple format using document.lastModified directly
		lastModifiedElement.textContent = document.lastModified
	}

	// Toggle mobile menu
	menuToggle.addEventListener('click', function () {
		navMenu.classList.toggle('active')
	})

	// Toggle dark/light theme
	themeToggle.addEventListener('click', function () {
		document.body.classList.toggle('dark-theme')

		// Switch logo based on theme
		if (document.body.classList.contains('dark-theme')) {
			logo.src = 'images/shared/chamber-logo-dark.svg'
			// Switch to dark icons for layout buttons
			gridViewIcon.src = 'images/grid-button-dark.svg'
			listViewIcon.src = 'images/table-button-dark.svg'
		} else {
			logo.src = 'images/shared/chamber-logo-light.svg'
			// Switch to light icons for layout buttons
			gridViewIcon.src = 'images/grid-button-light.svg'
			listViewIcon.src = 'images/table-button-light.svg'
		}
	})

	// Set initial logo based on system preference or saved preference
	if (document.body.classList.contains('dark-theme')) {
		logo.src = 'images/shared/chamber-logo-dark.svg'
		// Set dark icons for layout buttons if in dark mode initially
		if (gridViewIcon && listViewIcon) {
			gridViewIcon.src = 'images/grid-button-dark.svg'
			listViewIcon.src = 'images/table-button-dark.svg'
		}
	}
})
