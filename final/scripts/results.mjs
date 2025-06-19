/**
 * Simple Results Page Script
 * Shows the quiz results from URL parameters
 */

// Import theme
import { initTheme } from './theme.mjs'

// Get URL parameters
function getUrlParams() {
	const params = new URLSearchParams(window.location.search)
	return {
		userName: params.get('userName') || 'Anonymous',
		userEmail: params.get('userEmail') || 'No email provided',
		subject: params.get('subject') || 'Unknown',
		score: params.get('score') || '0',
		total: params.get('total') || '10',
		date: params.get('date') || new Date().toLocaleDateString(),
		difficulty: params.get('difficulty') || 'Not rated'
	}
}

// Calculate grade
function getGrade(score, total) {
	const percentage = (score / total) * 100

	if (percentage >= 90) return { grade: 'A', message: 'Excellent work!' }
	if (percentage >= 80) return { grade: 'B', message: 'Great job!' }
	if (percentage >= 70) return { grade: 'C', message: 'Good effort!' }
	if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!' }
	return { grade: 'F', message: 'Try again!' }
}

// Display results
function displayResults() {
	const data = getUrlParams()

	// Fill in the data
	document.getElementById('displayName').textContent = data.userName
	document.getElementById('displayEmail').textContent = data.userEmail
	document.getElementById('displayDate').textContent = data.date
	document.getElementById('displaySubject').textContent = data.subject
	document.getElementById('displayScore').textContent = `${data.score} / ${data.total}`

	const percentage = Math.round((data.score / data.total) * 100)
	document.getElementById('displayPercentage').textContent = `${percentage}%`
	document.getElementById('displayDifficulty').textContent = data.difficulty

	// Show grade
	const gradeInfo = getGrade(parseInt(data.score), parseInt(data.total))
	document.getElementById('performanceGrade').textContent = gradeInfo.grade
	document.getElementById('gradeMessage').textContent = gradeInfo.message

	// Save to localStorage for history
	try {
		const history = JSON.parse(localStorage.getItem('quiz-history') || '[]')
		history.push({
			userName: data.userName,
			subject: data.subject,
			score: data.score,
			total: data.total,
			percentage: percentage,
			date: data.date
		})
		localStorage.setItem('quiz-history', JSON.stringify(history))
	} catch (error) {
		console.log('Could not save to history')
	}
}

// Show quiz history
function showHistory() {
	try {
		const history = JSON.parse(localStorage.getItem('quiz-history') || '[]')
		const historyList = document.getElementById('historyList')

		if (history.length === 0) {
			historyList.innerHTML = '<p>No previous quiz attempts found.</p>'
			return
		}

		// Show last 5 attempts
		const recent = history.slice(-5).reverse()
		historyList.innerHTML = recent
			.map(function (item) {
				return `
				<div class="history-item">
					<h4>${item.subject}</h4>
					<p>Score: ${item.score}/${item.total} (${item.percentage}%)</p>
					<p>Date: ${item.date}</p>
				</div>
			`
			})
			.join('')
	} catch (error) {
		document.getElementById('historyList').innerHTML = '<p>Could not load history.</p>'
	}
}

// Share results
function shareResults() {
	const data = getUrlParams()
	const percentage = Math.round((data.score / data.total) * 100)
	const shareText = `I just completed a ${data.subject} quiz and scored ${data.score}/${data.total} (${percentage}%)! 🎉`

	document.getElementById('shareText').value = shareText
	document.getElementById('shareModal').style.display = 'block'
}

// Copy to clipboard
function copyToClipboard() {
	const shareText = document.getElementById('shareText')
	shareText.select()
	document.execCommand('copy')
	alert('Copied to clipboard!')
}

// Initialize results page
function initResults() {
	// Initialize theme
	initTheme()

	// Display the results
	displayResults()

	// Show history
	showHistory()

	// Add event listeners
	document.getElementById('shareResults').addEventListener('click', shareResults)
	document.getElementById('copyShare').addEventListener('click', copyToClipboard)
	document.getElementById('closeModal').addEventListener('click', function () {
		document.getElementById('shareModal').style.display = 'none'
	})

	document.getElementById('printResults').addEventListener('click', function () {
		window.print()
	})
}

// Start when page loads
document.addEventListener('DOMContentLoaded', initResults)
