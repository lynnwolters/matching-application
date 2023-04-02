function getLocation() { 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition)
	} else {
		x.innerHTML = 'Geolocation wordt niet gesupport door deze browser.'
	}
}

function showPosition(pos) {
	console.log(pos.coords)

	document.querySelector(
		'main section form label:nth-of-type(4)'
	).style.display = 'none'

	const map = L.map('map').setView(
		[pos.coords.latitude, pos.coords.longitude],
		13
	)

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: 'Mijn adres',
	}).addTo(map)

	const locationData = {
		latitude: pos.coords.latitude,
		longitude: pos.coords.longitude,
	}

	fetch(
		`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationData.latitude}&lon=${locationData.longitude}`
	)
		.then((response) => response.json())
		.then((data) => {
			const locationName = data.address.city || data.address.town || data.address.village || 'Onbekende locatie'
			document.querySelector('.location-name').textContent = locationName
		})
		.catch((error) => {
			console.error('Error bij opslaan locatie data: ', error)
		})

    document.querySelector('.location').style.height = '14em'
	document.querySelector('.location .location-text label').style.display = 'block'
}

getLocation()


