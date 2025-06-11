const currentYear = new Date().getFullYear()
const lastModified = new Date().toLocaleDateString()

document.getElementById('currentyear').textContent = currentYear
document.getElementById('lastmodified').textContent = 'Last Modified: ' + lastModified
