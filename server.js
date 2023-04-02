/* eslint-disable no-undef */ // om de foutmelding in eslint te verwijderen als een variable nog niet gedefined is




// *******//
// EXPRESS //
// ******* //

const express = require('express') // Om express functies te kunnen gebruiken
const app = express() // Om een express applicatie aan te maken




// ***** //
// PORT //
// ***** //

const PORT = process.env.PORT || 8000 // Luister naar poort 8000 als er geen andere poort gespecifieerd is

app.listen(PORT, function() { // Luisteren naar inkomende requests die op deze poort binnen komen
	console.log('Applicatie gestart op poort ' + PORT)
})




// ******* //
// DOTENV //
// ******* //

require('dotenv').config({ path: '.env' }) // Nodig om .env variablen in te laden / te lezen




// ************************ //
// MONGODB CONNECTIE MAKEN //
// ************************ //

const { MongoClient, ServerApiVersion } = require('mongodb') // MongoClient en ServerApiVersion functies inladen om met de database te communiceren
const uri = process.env.DB_CONNECTION_STRING // MongoDB connection string inladen uit .env bestand

const mongoClient = new MongoClient( // Connectie maken met mijn database met specifieke parameters om CRUD operations uit te kunnen voeren
	uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
)

mongoClient.connect() // Console log om te kijken of de connectie met MongoDb gelukt is of niet
	.then((res) => console.log('@@-- connection established'))
	.catch((err) => console.log('@@-- error', err))




// *********** //
// BODYPARSER //
// *********** //

const bodyParser = require('body-parser') // Verzoeken vanuit de body kunnen lezen

app.use(bodyParser.urlencoded({ extended: true })) // Urlencoded verzoeken vanuit de body kunnen lezen

app.use(bodyParser.json()) // JSON verzoeken vanuit de body kunnen lezen



// ************ //
// VIEW ENGINES //
// ************ //

app.set('view engine', 'ejs') // Instellen welke view engine ik gebruik

app.set('views', 'view') // De map waarin de view engines zich bevinden




// ************* //
// STATIC FILES //
// ************* //

app.use(express.static('static')) // Functie om static files te maken en ze terug te geven 




// *************** //
// POST INDEX.EJS //
// *************** //

app.post('/index', async (req, res) => { // Functie die wordt uitgevoerd als er een POST request wordt gedaan op de index.ejs pagina

	console.log(req.body) // Luisteren naar requests uit de body die gebruikers aanvragen

	const { // Variablen geven aan de ingevulde gegevens die vanuit de request body komen
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

	const locationName = req.body.locationName || ''

	const collection = mongoClient.db('matching-application').collection('profiles') // Collectie aanmaken in MongoDB met de naam 'profiles'

	await collection.findOneAndUpdate({}, { // Updaten van het eerste bestand in de collectie 'profiles' met de nieuwe waardes
		$set: {
			firstName: firstName, 
			lastName: lastName, 
			age: age, 
			residence: residence, 
			locationName: locationName,
			jobFunction: jobFunction, 
			aboutMe: aboutMe,
			education: education, 
			workExperience: workExperience,
			softSkills: softSkills,
			hardSkills: hardSkills    }
	})

	res.redirect('/index') // Doorsturen naar index.ejs na het uitvoeren van de functie
})




// ************** //
// GET INDEX.EJS //
// ************** //

app.get('/index', onHome) // Code om een GET request af te handelen op de index.ejs pagina

async function onHome(req, res) { // Functie die wordt uitgevoerd als er een GET request wordt gedaan op de index.ejs pagina

	const collection = mongoClient.db('matching-application').collection('profiles') // MongoDB gebruiker aanmaken in de collectie 'profiles'
	const profile = await collection.findOne({}) // Eerste document in de collectie 'profiles' pakken

	res.render('index', { // Profile object renderen op index.ejs pagina (resultaten opgeslagen input fields)
		profile    
	})
}




// ************************* //
// GET PROFIEL-BEWERKEN.EJS //
// ************************* //

app.get('/profiel-bewerken', profielBewerken) // Code om een GET request af te handelen op de profiel-bewerken.ejs pagina

async function profielBewerken(req, res) { // Functie die wordt uitgevoerd als er een GET request wordt gedaan op de profiel-bewerken.ejs pagina

	const collection = mongoClient.db('matching-application').collection('profiles') // MongoDB gebruiker aanmaken in de collectie 'profiles'
	const profile = await collection.findOne() // Eerste document in de collectie 'profiles' pakken

	res.render('profiel-bewerken', { // Profile object renderen op pagina-bewerken.ejs pagina (zien wat er op het moment is ingevuld)
		profile    
	})
}




// ******** //
// 404 PAGE //
// ******** //

app.use((req, res) => { // 404: Functie uitvoeren als het pad niet bekend is bij de server
	res.status(404).send('<h1>Deze pagina kan niet gevonden worden.</h1>') // Status code sturen met een bericht dat verteld wat er aan de hand is 
})
