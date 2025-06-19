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
		optionDiv.innerHTML = `
			<input type="radio" name="answer" value="${option}" class="answer-option__input" id="option${index}">
			<label for="option${index}" class="answer-option__label">
				<span class="answer-option__indicator">${String.fromCharCode(65 + index)}</span>
				<span class="answer-option__text">${option}</span>
			</label>
		`
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

	// Get the label element to style
	const selectedLabel = selected.parentElement.querySelector('.answer-option__label')

	if (isCorrect) {
		score++
		selectedLabel.style.backgroundColor = '#26d0ce'
		selectedLabel.style.color = 'white'
		selectedLabel.style.borderColor = '#26d0ce'
	} else {
		selectedLabel.style.backgroundColor = '#ee5454'
		selectedLabel.style.color = 'white'
		selectedLabel.style.borderColor = '#ee5454'

		// Show correct answer
		const correctOption = document.querySelector(`input[value="${correctAnswer}"]`)
		if (correctOption) {
			const correctLabel = correctOption.parentElement.querySelector('.answer-option__label')
			correctLabel.style.backgroundColor = '#26d0ce'
			correctLabel.style.color = 'white'
			correctLabel.style.borderColor = '#26d0ce'
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

	// Update header icon
	const iconMap = {
		HTML: 'images/icon-html.svg',
		CSS: 'images/icon-css.svg',
		JavaScript: 'images/icon-js.svg',
		Accessibility: 'images/icon-accessibility.svg'
	}
	subjectIcon.src = iconMap[getSubject()] || ''
	subjectIcon.style.display = 'block'

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
