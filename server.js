// NODIG OM EXPRESS TE KUNNEN GEBRUIKEN
const express = require('express')
const app = express()

// LOCALHOST PORT //
const PORT = process.env.PORT || 8000

// NODIG OM DATA OP EEN DYNAMISCHE MANIER IN TE LADEN
const fs = require('fs')
const jsonData = fs.readFileSync('static/data/data.json', 'utf8')
const myData = JSON.parse(jsonData)

// SERVER SUBMIT REQUEST LATEN AFHANDELEN
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/submit', function(req, res) {
	const inputValue = req.body.inputValue

	res.redirect('/')
})

// OPGESLAGEN SUMBIT WAARDEN LATEN ZIEN OP PAGINA
app.get('/', function(req, res) {
	const values = ['waarde1', 'waarde2', 'waarde3']
	res.render('index', { values: values })
})

app.listen(3000, function() {
	console.log('Applicatie gestart op poort 3000')
})

//  NODIG OM .ENV BESTAND IN TE LADEN
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

// INDEX.EJS INLADEN
app.get('/index', onHome)
function onHome(req, res) {
	res.render('index.ejs', {
		firstName: myData[0].firstName
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

// LOCALHOST LATEN WERKEN
app.listen(PORT, console.log(`Running on port: ${PORT}`))
