// Voer deze functie uit als de pagina geladen wordt
window.onload = function() {

	// Variable om save button op te halen
	const saveButton = document.querySelector('button[name="submit"]')

	// Variable om alle input fields op te halen
	const inputFields = document.querySelectorAll('input')
    
	// Variable disabled aanmaken die vanuit default true is (dus disabled)
	let disabled = true
	
	// Checken of savebutton anders is dan null...
	if (saveButton !== null) {

		// Als dat zo is, voeg dan de disabled variable toe aan de save button (button is disabled)
		saveButton.disabled = disabled
	}

	// Arrow functie aanmaken met de variable inputFields die boven gedeclareerd is, vervolgens een nieuwe variable aanmaken genaamd inputField
	inputFields.forEach((inputField) => {

		// 'Input' event listener meegeven aan inputField variable
		inputField.addEventListener('input', () => {

			// Variable hasValue aanmaken die vanuit default nog geen waarde heeft
			let hasValue = false

			// Voor elke input field...
			inputFields.forEach((field) => {

				// Als de input field value niet leeg is 
				if (field.value.trim() !== '') {

					// Voeg dan deze variable toe, ofwel hij heeft wel een waarde gekregen
					hasValue = true
				}
			})

			// Als er een value in de input fields staat
			if (hasValue) {

				// Dan wordt de save button beschikbaar
				disabled = false

				// En krijgt het een groene kleur
				saveButton.style.backgroundColor = 'green'

		    // Anders...
			} else {

				// Is de save button disabled 
				disabled = true

				// Blijft de save button kleur grijs
				saveButton.style.backgroundColor = ''
			}

			// 
			saveButton.disabled = disabled
		})
	})
}