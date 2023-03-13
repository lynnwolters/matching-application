/* eslint-disable no-undef */

// NODIG OM EXPRESS TE KUNNEN GEBRUIKEN
const express = require('express')
const app = express()

// NODIG OM .ENV BESTAND IN TE LADEN
require('dotenv').config({ path: '.env' })

// LOCALHOST PORT //
const PORT = process.env.PORT || 8000

// // MONGO DB CONNECTIE 
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.DB_CONNECTION_STRING

const client = new MongoClient(
	uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
)

client.connect()
	.then((res) => console.log('@@-- connection established'))
	.catch((err) => console.log('@@-- error', err))

// PORT WAAR SERVER OP DRAAIT
app.listen(PORT, function() {
	console.log('Applicatie gestart op poort ' + PORT)
})

// BODYPARSER LATEN WERKEN
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// VIEW ENGINES INLADEN
app.set('view engine', 'ejs')
app.set('views', 'view')

// STATIC CONTENT INLADEN
app.use(express.static('static'))

// FORM DATA OPSLAAN IN MONGODB
app.post('/index', function(req, res) {
	console.log(req.body)

	const collection = client.db('matching-application').collection('profiles')

	collection.insertOne(req.body)
		.then((result) => {
			console.log('succes')
			res.render('index', {profiel: req.body})
		})
		.catch((error) => {
			console.log(error)
		})
})

// INDEX.EJS INLADEN + FORM DATA INLADEN OP INDEX.EJS
app.get('/index', onHome)
function onHome(req, res) {

	const profiel = myData[0]

	res.render('index', {
		profiel
	})
}

// PROFIEL-BEWERKEN.EJS INLADEN
app.get('/profiel-bewerken', profielBewerken)
function profielBewerken(req, res) {
	res.render('profiel-bewerken')
}

// 404 PAGE
app.use((req, res) => {
	res.status(404).send('<h1>Deze pagina kan niet gevonden worden.</h1>')
})