// ========== JOIN PAGE FUNCTIONALITY ==========
// Author: Sam Bonfanti
// JavaScript functionality for the chamber join page
// Handles form timestamp, modal interactions, and card animations

// Functions defined first

/**
 * Sets the current timestamp in the hidden form field
 * This captures when the user loaded the form
 */
function setTimestamp() {
	const timestampField = document.getElementById('timestamp')
	if (timestampField) {
		// Create a new Date object with current date and time
		const now = new Date()
		// Format the timestamp as ISO string for consistent formatting
		timestampField.value = now.toISOString()
	}
}

/**
 * Initializes modal functionality for membership level information
 * Sets up event listeners for opening and closing modals
 */
function initializeModals() {
	// Get all modal trigger buttons (Learn More buttons)
	const modalTriggers = document.querySelectorAll('[data-modal]')

	// Get all modal close elements (backdrop and close button)
	const modalCloseElements = document.querySelectorAll('[data-close-modal]')

	// Add event listeners to modal trigger buttons
	modalTriggers.forEach((trigger) => {
		trigger.addEventListener('click', function () {
			const modalId = this.getAttribute('data-modal')
			openModal(modalId)
		})
	})

	// Add event listeners to modal close elements
	modalCloseElements.forEach((closeElement) => {
		closeElement.addEventListener('click', function () {
			closeModal()
		})
	})

	// Close modal when pressing Escape key
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			closeModal()
		}
	})
}

/**
 * Adds animation classes to membership cards for initial page load animation
 * Creates a staggered animation effect
 */
function animateMembershipCards() {
	const membershipCards = document.querySelectorAll('.membership__card')

	// Add animation classes with staggered delays
	membershipCards.forEach((card, index) => {
		// Add base animation class
		card.classList.add('membership__card--animated')

		// Set staggered animation delay using CSS custom property
		card.style.setProperty('--animation-delay', `${index * 0.2}s`)
	})
}

/**
 * Sets up simple form validation using helper text
 */
function initializeFormValidation() {
	const form = document.querySelector('.join__form')
	if (!form) return

	// Add submit event listener to form
	form.addEventListener('submit', validateForm)
}

/**
 * Validates the form before submission using helper text
 * @param {Event} event - The form submit event
 */
function validateForm(event) {
	const form = event.target
	const requiredFields = form.querySelectorAll('[required]')
	let isValid = true
	let firstInvalidField = null

	// Check each required field
	requiredFields.forEach((field) => {
		const helpText = field.parentNode.querySelector('.form__help-text')

		// Check if field is empty
		if (!field.value.trim()) {
			isValid = false

			// Show helper text with error styling using CSS class (only for required fields)
			if (helpText) {
				helpText.classList.add('form__help-text--error')
			}

			// Remember first invalid field for scrolling
			if (!firstInvalidField) {
				firstInvalidField = field
			}
		} else {
			// Hide helper text if field has content by removing error class (only for required fields)
			if (helpText) {
				helpText.classList.remove('form__help-text--error')
			}
		}
	})

	// If form is invalid, prevent submission and scroll to first error
	if (!isValid) {
		event.preventDefault()

		if (firstInvalidField) {
			firstInvalidField.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
			firstInvalidField.focus()
		}
	}
}

/**
 * Initialize all join page functionality
 */
function init() {
	setTimestamp()
	initializeModals()
	animateMembershipCards()
	initializeFormValidation()
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init)

/**
 * Opens a modal by its ID
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
	const modal = document.getElementById(modalId)
	if (modal) {
		// Show the modal
		modal.style.display = 'flex'
		modal.setAttribute('aria-hidden', 'false')

		// Focus the modal for accessibility
		const modalContent = modal.querySelector('.modal__content')
		if (modalContent) {
			modalContent.focus()
		}

		// Prevent body scrolling when modal is open
		document.body.style.overflow = 'hidden'
	}
}

/**
 * Closes the currently open modal
 */
function closeModal() {
	// Find the currently open modal
	const openModal = document.querySelector('.modal[style*="flex"]')
	if (openModal) {
		// Hide the modal
		openModal.style.display = 'none'
		openModal.setAttribute('aria-hidden', 'true')

		// Restore body scrolling
		document.body.style.overflow = ''

		// Return focus to the trigger button for accessibility
		const modalId = openModal.id
		const triggerButton = document.querySelector(`[data-modal="${modalId}"]`)
		if (triggerButton) {
			triggerButton.focus()
		}
	}
}
