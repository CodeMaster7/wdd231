/**
 * Simple Quiz Script
 * Handles the quiz functionality
 */

// Import theme
import { initTheme } from './theme.mjs'

// Quiz variables
let quizData = null
let currentQuestion = 0
let score = 0
let questions = []

// Get elements
const questionText = document.getElementById('questionText')
const answerOptions = document.getElementById('answerOptions')
const currentQuestionSpan = document.getElementById('currentQuestion')
const totalQuestionsSpan = document.getElementById('totalQuestions')
const progressBar = document.getElementById('progressBar')
const submitButton = document.getElementById('submitAnswer')
const nextButton = document.getElementById('nextQuestion')
const errorMessage = document.getElementById('errorMessage')
const resultsScreen = document.getElementById('resultsScreen')
const quizScreen = document.getElementById('quizScreen')
const finalScore = document.getElementById('finalScore')
const finalTotal = document.getElementById('finalTotal')
const resultSubject = document.getElementById('resultSubject')
const subjectIcon = document.getElementById('subjectIcon')

// Get subject from URL
function getSubject() {
	const params = new URLSearchParams(window.location.search)
	return params.get('subject')
}

// Load quiz data
async function loadQuizData() {
	try {
		const response = await fetch('./data/data.json')
		const data = await response.json()

		const subject = getSubject()
		const quiz = data.quizzes.find((q) => q.title === subject)

		if (quiz) {
			quizData = quiz
			questions = quiz.questions.slice(0, 10) // Take first 10 questions
			return true
		}
		return false
	} catch (error) {
		console.log('Error loading quiz data')
		return false
	}
}

// Show current question
function showQuestion() {
	if (currentQuestion >= questions.length) {
		showResults()
		return
	}

	const question = questions[currentQuestion]

	// Update question text
	questionText.textContent = question.question

	// Update counters
	currentQuestionSpan.textContent = currentQuestion + 1
	totalQuestionsSpan.textContent = questions.length

	// Update progress bar
	const progress = ((currentQuestion + 1) / questions.length) * 100
	progressBar.style.width = progress + '%'

	// Create answer options
	answerOptions.innerHTML = ''
	question.options.forEach(function (option, index) {
		const optionDiv = document.createElement('div')
		optionDiv.className = 'answer-option'

		// Create input
		const input = document.createElement('input')
		input.type = 'radio'
		input.name = 'answer'
		input.value = option
		input.className = 'answer-option__input'
		input.id = 'option' + index

		// Create label
		const label = document.createElement('label')
		label.htmlFor = 'option' + index
		label.className = 'answer-option__label'

		// Create indicator
		const indicator = document.createElement('span')
		indicator.className = 'answer-option__indicator'
		indicator.textContent = String.fromCharCode(65 + index)

		// Create text span
		const textSpan = document.createElement('span')
		textSpan.className = 'answer-option__text'
		textSpan.textContent = option

		// Append elements
		label.appendChild(indicator)
		label.appendChild(textSpan)
		optionDiv.appendChild(input)
		optionDiv.appendChild(label)
		answerOptions.appendChild(optionDiv)
	})

	// Reset buttons
	submitButton.disabled = true
	submitButton.style.display = 'block'
	nextButton.style.display = 'none'
	errorMessage.style.display = 'none'
}

// Check answer
function checkAnswer() {
	const selected = document.querySelector('input[name="answer"]:checked')

	if (!selected) {
		errorMessage.style.display = 'block'
		return
	}

	const userAnswer = selected.value
	const correctAnswer = questions[currentQuestion].answer
	const isCorrect = userAnswer === correctAnswer

	if (isCorrect) {
		score++
		selected.parentElement.classList.add('answer-option--correct')
	} else {
		selected.parentElement.classList.add('answer-option--incorrect')

		// Show correct answer
		const correctOption = document.querySelector(`input[value="${correctAnswer}"]`)
		if (correctOption) {
			correctOption.parentElement.classList.add('answer-option--correct')
		}
	}

	// Disable all options
	document.querySelectorAll('input[name="answer"]').forEach(function (input) {
		input.disabled = true
	})

	// Show next button
	submitButton.style.display = 'none'
	nextButton.style.display = 'block'
	if (currentQuestion === questions.length - 1) {
		nextButton.textContent = 'See Results'
	}
}

// Go to next question
function nextQuestion() {
	currentQuestion++
	showQuestion()
}

// Show results
function showResults() {
	quizScreen.style.display = 'none'
	resultsScreen.style.display = 'block'

	finalScore.textContent = score
	finalTotal.textContent = questions.length
	resultSubject.textContent = getSubject()

	// Set the results icon
	const iconMap = {
		HTML: 'images/icon-html.svg',
		CSS: 'images/icon-css.svg',
		JavaScript: 'images/icon-js.svg',
		Accessibility: 'images/icon-accessibility.svg'
	}
	const resultIcon = document.getElementById('resultIcon')
	resultIcon.src = iconMap[getSubject()] || ''
	resultIcon.style.display = 'block'

	// Fill hidden form fields
	document.getElementById('hiddenSubject').value = getSubject()
	document.getElementById('hiddenScore').value = score
	document.getElementById('hiddenTotal').value = questions.length
	document.getElementById('hiddenDate').value = new Date().toLocaleDateString()
}

// Initialize quiz
async function initQuiz() {
	// Initialize theme
	initTheme()

	// Load quiz data
	const loaded = await loadQuizData()
	if (!loaded) {
		alert('Could not load quiz. Please try again.')
		window.location.href = 'index.html'
		return
	}

	// Header icon is not used - icon only shows in results

	// Show first question
	showQuestion()

	// Add event listeners
	submitButton.addEventListener('click', function (e) {
		e.preventDefault()
		checkAnswer()
	})

	nextButton.addEventListener('click', nextQuestion)

	// Enable submit button when answer is selected
	answerOptions.addEventListener('change', function () {
		submitButton.disabled = false
		errorMessage.style.display = 'none'
	})

	// Play again button
	document.getElementById('playAgain').addEventListener('click', function () {
		window.location.reload()
	})
}

// Start when page loads
document.addEventListener('DOMContentLoaded', initQuiz)
