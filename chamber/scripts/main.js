// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
	const menuToggle = document.querySelector('.nav__toggle-menu')
	const navMenu = document.querySelector('.nav')
	const themeToggle = document.querySelector('.nav__toggle-theme')
	const logo = document.querySelector('.header__logo')

	// Toggle mobile menu
	menuToggle.addEventListener('click', function () {
		navMenu.classList.toggle('active')
	})

	// Toggle dark/light theme
	themeToggle.addEventListener('click', function () {
		document.body.classList.toggle('dark-theme')

		// Switch logo based on theme
		if (document.body.classList.contains('dark-theme')) {
			logo.src = 'images/shared/surprise-city-chamber-logo-dark.svg'
		} else {
			logo.src = 'images/shared/surprise-city-chamber-logo-light.svg'
		}
	})

	// Set initial logo based on system preference or saved preference
	if (document.body.classList.contains('dark-theme')) {
		logo.src = 'images/shared/surprise-city-chamber-logo-dark.svg'
	}
})
