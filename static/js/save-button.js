const saveButton = document.querySelector('#save-button') // Variable aanmaken voor #save-button
const inputValue = document.querySelectorAll('.input-value') // Variable aanmaken voor .input-value
const inputValueArray = [...inputValue] // Variable aanmaken met een array waarin de input value vast wordt gelegd
const inputWithStartValues = inputValueArray.map((inputValue) => { // inputValueArray omzetten naar een nieuwe array (inputWithStartValues)

	
	return { // Objecten creëren voor de huidige objecten in de loop
		inputValue: inputValue,
		value: inputValue.value,
	}
})

saveButton.disabled = true // Variable die bovenaan is gedeclareerd wordt standaard op disabled gezet

inputValue.forEach((item, index) => { // Voor elke input value...

	item.addEventListener('keyup', (event) => { // Voeg een keyup eventlistener toe (check of er wordt getypt in een input field)

		const filteredArray = inputWithStartValues.filter((item) => { // inputWithStartValues filteren 
			return item.inputValue.value !== item.value // Kijken of inputValue verschilt ten opzichte van value
		})
        
		if (filteredArray.length) { 
			saveButton.disabled = false // Als de lengte van de array groter dan 0 is, dan wordt de button unlocked
		} else {
			saveButton.disabled = true // Als de lengte van de array kleiner is dan 0, dan is de button disabled
		}
	})
})
