// Elements
const hamburgerBtn = document.getElementById('hamburgerBtn')
const primaryNav = document.getElementById('primaryNav')
const coursesContainer = document.getElementById('coursesContainer')
const totalCreditsSpan = document.getElementById('totalCredits')
const allBtn = document.getElementById('allBtn')
const cseBtn = document.getElementById('cseBtn')
const wddBtn = document.getElementById('wddBtn')

// Modal elements
const courseModal = document.getElementById('courseModal')
const closeModalBtn = document.getElementById('closeModal')
const modalTitle = document.getElementById('modalTitle')
const modalCredits = document.getElementById('modalCredits')
const modalCertificate = document.getElementById('modalCertificate')
const modalDescription = document.getElementById('modalDescription')
const modalTechnology = document.getElementById('modalTechnology')

// Toggle navigation menu
hamburgerBtn.addEventListener('click', () => {
	primaryNav.classList.toggle('responsive')
})

// Display courses - now creates simple clickable cards
function displayCourses(coursesToDisplay) {
	// Clear the container
	coursesContainer.innerHTML = ''

	// Calculate total credits
	const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0)
	totalCreditsSpan.textContent = totalCredits

	// Create and append simple course cards
	coursesToDisplay.forEach((course) => {
		// Create card element
		const card = document.createElement('div')

		// Set classes based on completion status using BEM naming convention
		const baseClass = 'course-card'
		const subjectClass = `course-card--${course.subject.toLowerCase()}`
		const statusClass = course.completed ? 'course-card--completed' : ''

		card.className = `${baseClass} ${subjectClass} ${statusClass}`.trim()

		// Make card clickable with cursor pointer
		card.style.cursor = 'pointer'

		// Create completion status indicator
		const completionStatus = course.completed
			? '<span class="course-card__status">✓ Completed</span>'
			: '<span class="course-card__status">In Progress</span>'

		// Create simple card content - course code and completion status
		card.innerHTML = `
            <h3 class="course-card__code">${course.subject} ${course.number}</h3>
            ${completionStatus}
        `

		// Add click event listener to open modal
		card.addEventListener('click', () => {
			showCourseModal(course)
		})

		// Append card to container
		coursesContainer.appendChild(card)
	})
}

// Function to display the course modal
function showCourseModal(course) {
	// Populate modal with course data
	modalTitle.textContent = `${course.subject} ${course.number} - ${course.title}`
	modalCredits.textContent = course.credits
	modalCertificate.textContent = course.certificate
	modalDescription.textContent = course.description
	modalTechnology.textContent = course.technology.join(', ')

	// Show the modal
	courseModal.showModal()
}

// Function to close the modal
function closeCourseModal() {
	courseModal.close()
}

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', closeCourseModal)

// Close modal when clicking outside of it (on the backdrop)
courseModal.addEventListener('click', (e) => {
	// Check if the click was on the dialog itself (backdrop area)
	if (e.target === courseModal) {
		closeCourseModal()
	}
})

// Filter buttons functionality
allBtn.addEventListener('click', () => {
	setActiveButton(allBtn)
	displayCourses(courses)
})

cseBtn.addEventListener('click', () => {
	setActiveButton(cseBtn)
	const cseCourses = courses.filter((course) => course.subject === 'CSE')
	displayCourses(cseCourses)
})

wddBtn.addEventListener('click', () => {
	setActiveButton(wddBtn)
	const wddCourses = courses.filter((course) => course.subject === 'WDD')
	displayCourses(wddCourses)
})

// Helper function to set active button
function setActiveButton(button) {
	;[allBtn, cseBtn, wddBtn].forEach((btn) => {
		btn.classList.remove('active')
	})
	button.classList.add('active')
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear()

// Set last modified date in footer
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`

// Initialize the page with all courses
displayCourses(courses)
