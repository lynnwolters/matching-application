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

// app.post('/index', async (req,res) => {
// 	console.log(req.body)

// 	const collection = client.db('matching-application').collection('profiles')

// 	collection.insertOne(req.body)
// 		.then((result) => {
// 			console.log('De data is opgeslagen in MongoDB!')
// 			res.render('index', {profile: req.body})
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// })

// INDEX.EJS: POST 
app.post('/index', async (req, res) => {

	console.log(req.body)

	const { 
		firstName, 
		lastName, 
		age, 
		residence, 
		jobFunction, 
		aboutMe,
		education, 
		workExperience,
		softSkills,
		hardSkills  } = req.body  

	const collection = client.db('matching-application').collection('profiles')

	await collection.findOneAndUpdate({}, {
		$set: {
			firstName: firstName, 
			lastName: lastName, 
			age: age, 
			residence: residence, 
			jobFunction: jobFunction, 
			aboutMe: aboutMe,
			education: education, 
			workExperience: workExperience,
			softSkills: softSkills,
			hardSkills: hardSkills    }
	})

	res.redirect('/index')
})

// INDEX.EJS: GET 
app.get('/index', onHome)
async function onHome(req, res) {
	const collection = client.db('matching-application').collection('profiles')

	const profile = await collection.findOne({})

	res.render('index', {
		profile    
	})
}

// PROFIEL-BEWERKEN.EJS: GET 
app.get('/profiel-bewerken', profielBewerken)
async function profielBewerken(req, res) {
	const collection = client.db('matching-application').collection('profiles')

	const profile = await collection.findOne()

	res.render('profiel-bewerken', {
		profile    
	})
}

// 404 PAGE
app.use((req, res) => {
	res.status(404).send('<h1>Deze pagina kan niet gevonden worden.</h1>')
})