const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json'
const cards = document.querySelector('#cards')

async function getProphetsData() {
	const response = await fetch(url)
	const data = await response.json()
	console.log(data)
	console.table(data.prophets)

	displayProphets(data.prophets)
}

const displayProphets = (prophets) => {
	prophets.forEach((prophet) => {
		// Create elements to add to the div.cards element
		const card = document.createElement('section')
		const fullName = document.createElement('h2')
		const portrait = document.createElement('img')
		const birthDate = document.createElement('p')
		const birthPlace = document.createElement('p')

		// Add BEM class names to elements
		card.classList.add('card')
		fullName.classList.add('card__name')
		portrait.classList.add('card__image')
		birthDate.classList.add('card__birthdate')
		birthPlace.classList.add('card__birthplace')

		// Build the h2 content out to show the prophet's full name
		fullName.textContent = `${prophet.name} ${prophet.lastname}`

		// Build the img element
		portrait.setAttribute('src', prophet.imageurl)
		portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - Latter-day Prophet`)
		portrait.setAttribute('loading', 'lazy')
		portrait.setAttribute('width', '340')
		portrait.setAttribute('height', '400')

		// Build the p elements
		birthDate.textContent = `Date of Birth: ${prophet.birthdate}`
		birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`

		// Add/append the section(card) with the h2 and img
		card.appendChild(fullName)
		card.appendChild(birthDate)
		card.appendChild(birthPlace)
		card.appendChild(portrait)

		// Add/append the card to the cards element
		cards.appendChild(card)
	})
}

getProphetsData()
