/**
 * Simple Home Page Script
 * Just handles theme and basic interactions
 */

// Import the simple theme function
import { initTheme } from './theme.mjs'

// Get elements
const subjectButtons = document.querySelectorAll('.subject-btn')

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
	// Initialize theme
	initTheme()

	// Add click effects to subject buttons
	subjectButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			// Add loading effect
			button.style.opacity = '0.7'

			// Get subject name for tracking
			const url = new URL(button.href)
			const subject = url.searchParams.get('subject')

			// Simple tracking - just log it
			console.log('Selected subject:', subject)

			// Save to localStorage for analytics
			try {
				const selections = JSON.parse(localStorage.getItem('subject-selections') || '[]')
				selections.push({
					subject: subject,
					date: new Date().toISOString()
				})
				localStorage.setItem('subject-selections', JSON.stringify(selections))
			} catch (error) {
				console.log('Could not save selection')
			}
		})
	})

	console.log('Home page ready')
})
