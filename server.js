/* eslint-disable no-undef */

// NODIG OM EXPRESS TE KUNNEN GEBRUIKEN
const express = require('express')
const app = express()

// LOCALHOST PORT //
const PORT = process.env.PORT || 8000

app.listen(PORT, function() {
	console.log('Applicatie gestart op poort ' + PORT)
})

// NODIG OM DATA OP EEN DYNAMISCHE MANIER IN TE LADEN
const fs = require('fs')
const jsonData = fs.readFileSync('static/data/data.json', 'utf8')
let myData = JSON.parse(jsonData)

// BODYPARSER LATEN WERKEN
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// NODIG OM .ENV BESTAND IN TE LADEN
require('dotenv').config()

// MONGO DB CONNECTIE 
const { MongoClient } = require('mongodb')

const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS + '@' +
process.env.DB_NAME + '.' + process.env.DB_HOST + '/' + '?retryWrites=true&w=majority'

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect((err) => { 
	if (err) {
		console.error('Er is een error gevonden tijdens het verbinden met MongoDB:', err)
	} else {
		console.log('Je bent verbonden met MongoDB!')
	}
})

// VIEW ENGINES INLADEN
app.set('view engine', 'ejs')
app.set('views', 'view')

// STATIC CONTENT INLADEN
app.use(express.static('static'))

// FORM POST REQUEST AFHANDELEN
app.post('/index', function(req, res) {
	console.log(req.body)

	console.log(req.body.firstName)
	myData[0].firstName = req.body.firstName

	console.log(req.body.lastName)
	myData[0].lastName = req.body.lastName

	console.log(req.body.age)
	myData[0].age = req.body.age

	console.log(req.body.residence)
	myData[0].residence = req.body.residence

	console.log(req.body.jobFunction)
	myData[0].jobFunction = req.body.jobFunction

	console.log(req.body.aboutMe)
	myData[0].aboutMe = req.body.aboutMe

	console.log(req.body.education)
	myData[0].education = req.body.education

	console.log(req.body.experience)
	myData[0].workExperience = req.body.workExperience

	console.log(req.body.softSkills)
	myData[0].softSkills = req.body.softSkills

	console.log(req.body.hardSkills)
	myData[0].hardSkills = req.body.hardSkills

	res.redirect('/index')
})

// INDEX.EJS INLADEN
app.get('/index', onHome)
function onHome(req, res) {
	console.log(myData[0])

	res.render('index.ejs', {
		firstName: myData[0].firstName,
		lastName: myData[0].lastName,
		age: myData[0].age,
		residence: myData[0].residence,
		jobFunction: myData[0].jobFunction,
		aboutMe: myData[0].aboutMe,
		education: myData[0].education,
		workExperience: myData[0].workExperience,
		softSkills: myData[0].softSkills,
		hardSkills: myData[0].hardSkills,
	})
}

// PROFIEL-BEWERKEN.EJS INLADEN
app.get('/profiel-bewerken', profielBewerken)
function profielBewerken(req, res) {
	res.render('profiel-bewerken.ejs')
}

// 404 PAGE
app.use((req, res) => {
	res.status(404).send('<h1>Deze pagina kan niet gevonden worden.</h1>')
})