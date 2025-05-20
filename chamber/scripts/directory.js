document.addEventListener('DOMContentLoaded', () => {
	// DOM elements
	const gridViewBtn = document.getElementById('grid-view-btn')
	const listViewBtn = document.getElementById('list-view-btn')
	const gridView = document.getElementById('grid-view')
	const listView = document.getElementById('list-view')

	// Toggle between grid and list views
	gridViewBtn.addEventListener('click', () => {
		gridView.style.display = 'grid'
		listView.style.display = 'none'
		gridViewBtn.classList.add('view-btn--active')
		listViewBtn.classList.remove('view-btn--active')
	})

	listViewBtn.addEventListener('click', () => {
		gridView.style.display = 'none'
		listView.style.display = 'flex'
		listViewBtn.classList.add('view-btn--active')
		gridViewBtn.classList.remove('view-btn--active')
	})

	// Fetch and display members
	async function loadMembers() {
		try {
			const response = await fetch('data/members.json')
			const data = await response.json()
			displayMembers(data.members)
		} catch (error) {
			console.error('Error loading members:', error)
		}
	}

	// Display members in both grid and list format
	function displayMembers(members) {
		// Clear containers
		gridView.innerHTML = ''
		listView.innerHTML = ''

		members.forEach((member) => {
			// Create grid card
			const card = document.createElement('div')
			card.className = 'directory__grid-card'
			card.innerHTML = `
                <div class="directory__card-img">
                    <img src="${member.image}" alt="${member.name} Logo"
                        width="100" height="100"
                        style="max-width: 100%; height: auto; object-fit: contain;"
                        onerror="this.onerror=null; this.src='images/shared/placeholder.png';">
                </div>
                <div class="directory__card-content">
                    <h3 class="directory__card-title">${member.name}</h3>
                    <p class="directory__card-detail">${member.address}</p>
                    <p class="directory__card-detail">${member.phone}</p>
                    <a href="${member.website}" class="directory__card-link" target="_blank" rel="noopener">Visit Website</a>
                </div>
            `
			gridView.appendChild(card)

			// Create list item
			const item = document.createElement('div')
			item.className = 'directory__list-item'
			item.innerHTML = `
                <h3 class="directory__list-title">${member.name}</h3>
                <p class="directory__list-detail">${member.address}</p>
                <p class="directory__list-detail">${member.phone}</p>
                <a href="${member.website}" class="directory__card-link" target="_blank" rel="noopener">Visit Website</a>
            `
			listView.appendChild(item)
		})

		// Show grid view by default
		gridView.style.display = 'grid'
		listView.style.display = 'none'
	}

	// Load the members
	loadMembers()
})
