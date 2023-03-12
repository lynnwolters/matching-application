// JavaScript code
// Haal de inputvelden op
const firstNameInput = document.getElementById('firstName')
const lastNameInput = document.getElementById('lastName')
const ageInput = document.getElementById('age')

// Haal de opgeslagen waarden op uit de lokale opslag (local storage)
const savedFirstName = localStorage.getItem('firstName')
const savedLastName = localStorage.getItem('lastName')
const savedAge = localStorage.getItem('age')

// Stel de opgeslagen waarden in als de huidige waarde van de inputvelden
if (savedFirstName) {
	firstNameInput.value = savedFirstName
}
if (savedLastName) {
	lastNameInput.value = savedLastName
}
if (savedAge) {
	ageInput.value = savedAge
}

// Voeg een event listener toe aan het formulier om de waarden op te slaan wanneer het wordt verzonden
const form = document.querySelector('form')
form.addEventListener('submit', function(event) {
	// event.preventDefault() // Voorkom dat het formulier wordt verzonden

	// Sla de waarden op in de lokale opslag
	localStorage.setItem('firstName', firstNameInput.value)
	localStorage.setItem('lastName', lastNameInput.value)
	localStorage.setItem('age', ageInput.value)

	alert('De gegevens zijn opgeslagen.')
})