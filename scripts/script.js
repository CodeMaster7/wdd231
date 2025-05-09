// Elements
const hamburgerBtn = document.getElementById('hamburgerBtn')
const primaryNav = document.getElementById('primaryNav')
const coursesContainer = document.getElementById('coursesContainer')
const totalCreditsSpan = document.getElementById('totalCredits')
const allBtn = document.getElementById('allBtn')
const cseBtn = document.getElementById('cseBtn')
const wddBtn = document.getElementById('wddBtn')

// Toggle navigation menu
hamburgerBtn.addEventListener('click', () => {
	primaryNav.classList.toggle('responsive')
})

// Display courses
function displayCourses(coursesToDisplay) {
	// Clear the container
	coursesContainer.innerHTML = ''

	// Calculate total credits
	const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0)
	totalCreditsSpan.textContent = totalCredits

	// Create and append course cards
	coursesToDisplay.forEach((course) => {
		// Create card element
		const card = document.createElement('div')

		// Set classes based on completion status using BEM naming convention
		const baseClass = 'course-card'
		const subjectClass = `course-card--${course.subject.toLowerCase()}`
		const statusClass = course.completed ? 'course-card--completed' : ''

		card.className = `${baseClass} ${subjectClass} ${statusClass}`.trim()

		// Create completion status indicator
		const completionStatus = course.completed
			? '<span class="course-card__status">✓ Completed</span>'
			: '<span class="course-card__status">In Progress</span>'

		// Create card content
		card.innerHTML = `
            <h3 class="course-card__code">${course.subject} ${course.number}</h3>
            <h4 class="course-card__title">${course.title}</h4>
            <p class="course-card__credits">Credits: ${course.credits}</p>
            <p class="course-card__tech">Technologies: ${course.technology.join(', ')}</p>
            ${completionStatus}
        `

		// Append card to container
		coursesContainer.appendChild(card)
	})
}

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
