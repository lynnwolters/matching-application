window.onload = function() {

	const saveButton = document.querySelector('button[name="submit"]')
	const inputFields = document.querySelectorAll('input')

	let disabled = true
	
	if (saveButton !== null) {
		saveButton.disabled = disabled
	}

	inputFields.forEach((inputField) => {
		inputField.addEventListener('input', () => {

			let hasValue = false
			inputFields.forEach((field) => {
				if (field.value.trim() !== '') {
					hasValue = true
				}
			})

			if (hasValue) {
				disabled = false
				saveButton.style.backgroundColor = 'green'
			} else {
				disabled = true
				saveButton.style.backgroundColor = ''
			}

			saveButton.disabled = disabled
		})
	})
}