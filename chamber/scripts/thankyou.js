// ========== THANK YOU PAGE FUNCTIONALITY ==========
// Author: Sam Bonfanti
// JavaScript functionality for the chamber thank you page
// Displays form submission data from URL parameters

// Functions defined first

/**
 * Displays the application information from URL parameters
 * Extracts form data passed via GET method and displays it nicely
 */
function displayApplicationInfo() {
	// Get URL parameters
	const urlParams = new URLSearchParams(window.location.search)
	const applicationInfo = document.getElementById('applicationInfo')

	if (!applicationInfo) {
		return // Exit if element doesn't exist
	}

	// Check if we have form data
	if (urlParams.toString()) {
		// Create a container for the application details
		const infoHTML = generateApplicationHTML(urlParams)
		applicationInfo.innerHTML = infoHTML
	} else {
		// Show message if no data was passed
		applicationInfo.innerHTML = `
            <p class="thankyou__no-data">
                No application data found. Please ensure you submitted the form correctly.
            </p>
        `
	}
}

/**
 * Generates HTML content for displaying application information
 * @param {URLSearchParams} urlParams - URL parameters containing form data
 * @returns {string} HTML string with formatted application data
 */
function generateApplicationHTML(urlParams) {
	// Extract form data with fallbacks for missing values
	const firstName = urlParams.get('firstName') || 'Not provided'
	const lastName = urlParams.get('lastName') || 'Not provided'
	const orgTitle = urlParams.get('orgTitle') || 'Not provided'
	const email = urlParams.get('email') || 'Not provided'
	const phone = urlParams.get('phone') || 'Not provided'
	const businessName = urlParams.get('businessName') || 'Not provided'
	const membershipLevel = urlParams.get('membershipLevel') || 'Not selected'
	const businessDescription = urlParams.get('businessDescription') || 'Not provided'
	const timestamp = urlParams.get('timestamp') || 'Not available'

	// Format timestamp for better readability
	const formattedTimestamp = formatTimestamp(timestamp)

	// Format membership level for display
	const formattedMembershipLevel = formatMembershipLevel(membershipLevel)

	// Generate HTML
	return `
        <div class="application__details">
            <div class="detail__group">
                <h4 class="detail__category">Personal Information</h4>
                <div class="detail__items">
                    <div class="detail__item">
                        <span class="detail__label">Name:</span>
                        <span class="detail__value">${escapeHtml(firstName)} ${escapeHtml(lastName)}</span>
                    </div>
                    <div class="detail__item">
                        <span class="detail__label">Organization Title:</span>
                        <span class="detail__value">${escapeHtml(orgTitle)}</span>
                    </div>
                </div>
            </div>

            <div class="detail__group">
                <h4 class="detail__category">Contact Information</h4>
                <div class="detail__items">
                    <div class="detail__item">
                        <span class="detail__label">Email:</span>
                        <span class="detail__value">${escapeHtml(email)}</span>
                    </div>
                    <div class="detail__item">
                        <span class="detail__label">Phone:</span>
                        <span class="detail__value">${escapeHtml(phone)}</span>
                    </div>
                </div>
            </div>

            <div class="detail__group">
                <h4 class="detail__category">Business Information</h4>
                <div class="detail__items">
                    <div class="detail__item">
                        <span class="detail__label">Business Name:</span>
                        <span class="detail__value">${escapeHtml(businessName)}</span>
                    </div>
                    <div class="detail__item">
                        <span class="detail__label">Membership Level:</span>
                        <span class="detail__value detail__value--membership">${formattedMembershipLevel}</span>
                    </div>
                    ${
						businessDescription !== 'Not provided'
							? `
                    <div class="detail__item detail__item--full">
                        <span class="detail__label">Business Description:</span>
                        <span class="detail__value">${escapeHtml(businessDescription)}</span>
                    </div>
                    `
							: ''
					}
                </div>
            </div>

            <div class="detail__group">
                <h4 class="detail__category">Application Details</h4>
                <div class="detail__items">
                    <div class="detail__item">
                        <span class="detail__label">Submitted:</span>
                        <span class="detail__value">${formattedTimestamp}</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

/**
 * Formats the timestamp for better readability
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Formatted date and time string
 */
function formatTimestamp(timestamp) {
	if (!timestamp || timestamp === 'Not available') {
		return 'Not available'
	}

	try {
		const date = new Date(timestamp)
		// Format as readable date and time
		return date.toLocaleString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
	} catch (error) {
		console.error('Error formatting timestamp:', error)
		return timestamp // Return original if formatting fails
	}
}

/**
 * Formats membership level for display
 * @param {string} membershipLevel - Raw membership level value
 * @returns {string} Formatted membership level string
 */
function formatMembershipLevel(membershipLevel) {
	const membershipMap = {
		np: 'NP Membership (Non-Profit - Free)',
		bronze: 'Bronze Membership ($150/year)',
		silver: 'Silver Membership ($300/year)',
		gold: 'Gold Membership ($500/year)'
	}

	return membershipMap[membershipLevel] || membershipLevel || 'Not selected'
}

/**
 * Escapes HTML characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
	if (!text) return ''

	const div = document.createElement('div')
	div.textContent = text
	return div.innerHTML
}

/**
 * Initialize all thank you page functionality
 */
function init() {
	displayApplicationInfo()
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init)
