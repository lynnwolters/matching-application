// om de foutmelding in eslint te verwijderen als een variable nog niet gedefined is
/* eslint-disable no-undef */ 

// Om express functies te kunnen gebruiken
const express = require('express')

// Om een express applicatie aan te maken
const app = express()

// Luister naar poort 8000 als er geen andere poort gespecifieerd is
const PORT = process.env.PORT || 8000

// Luisteren naar inkomende requests die op deze poort binnen komen
app.listen(PORT, function() {
	console.log('Applicatie gestart op poort ' + PORT)
})

// Nodig om .env variablen in te laden / te lezen
require('dotenv').config({ path: '.env' })

// MongoClient en ServerApiVersion functies inladen om met de database te communiceren
const { MongoClient, ServerApiVersion } = require('mongodb')

// MongoDB connection string inladen uit .env bestand
const uri = process.env.DB_CONNECTION_STRING

//  Connectie maken met mijn database met specifieke parameters om CRUD operations uit te kunnen voeren
const client = new MongoClient(
	uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
)

// Console log om te kijken of de connectie met MongoDb gelukt is of niet
client.connect()
	.then((res) => console.log('@@-- connection established'))
	.catch((err) => console.log('@@-- error', err))

// Verzoeken vanuit de body kunnen lezen
const bodyParser = require('body-parser')

// Urlencoded verzoeken vanuit de body kunnen lezen
app.use(bodyParser.urlencoded({ extended: true }))

// JSON verzoeken vanuit de body kunnen lezen
app.use(bodyParser.json())

// Instellen welke view engine ik gebruik
app.set('view engine', 'ejs')

// De map waarin de view engines zich bevinden
app.set('views', 'view')

// Functie om static files te maken en ze terug te geven 
app.use(express.static('static'))

// *************** //
// POST INDEX.EJS //
// *************** //

// Functie die wordt uitgevoerd als er een POST request wordt gedaan op de index.ejs pagina
app.post('/index', async (req, res) => {

	// Luisteren naar requests uit de body die gebruikers aanvragen
	console.log(req.body)

	// Variablen geven aan de ingevulde gegevens die vanuit de request body komen
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

	// Collectie aanmaken in MongoDB met de naam 'profiles'
	const collection = client.db('matching-application').collection('profiles')

	// Updaten van het eerste bestand in de collectie 'profiles' met de nieuwe waardes
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

	// Doorsturen naar index.ejs na het uitvoeren van de functie
	res.redirect('/index')
})

// ************** //
// GET INDEX.EJS //
// ************** //

// Code om een GET request af te handelen op de index.ejs pagina
app.get('/index', onHome)

// Functie die wordt uitgevoerd als er een GET request wordt gedaan op de index.ejs pagina
async function onHome(req, res) {

	// MongoDB gebruiker aanmaken in de collectie 'profiles'
	const collection = client.db('matching-application').collection('profiles')

	// Eerste document in de collectie 'profiles' pakken
	const profile = await collection.findOne({})

	// Profile object renderen op index.ejs pagina (resultaten opgeslagen input fields)
	res.render('index', {
		profile    
	})
}

// ************************* //
// GET PROFIEL-BEWERKEN.EJS //
// ************************* //

// Code om een GET request af te handelen op de profiel-bewerken.ejs pagina
app.get('/profiel-bewerken', profielBewerken)

// Functie die wordt uitgevoerd als er een GET request wordt gedaan op de profiel-bewerken.ejs pagina
async function profielBewerken(req, res) {

	// MongoDB gebruiker aanmaken in de collectie 'profiles'
	const collection = client.db('matching-application').collection('profiles')

	// Eerste document in de collectie 'profiles' pakken
	const profile = await collection.findOne()

	// Profile object renderen op pagina-bewerken.ejs pagina (zien wat er op het moment is ingevuld)
	res.render('profiel-bewerken', {
		profile    
	})
}

// ******** //
// 404 PAGE //
// ******** //

// 404: Functie uitvoeren als het pad niet bekend is bij de server
app.use((req, res) => {

	// Status code sturen met een bericht dat verteld wat er aan de hand is 
	res.status(404).send('<h1>Deze pagina kan niet gevonden worden.</h1>')
})
