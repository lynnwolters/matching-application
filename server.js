// NODIG OM EXPRESS TE KUNNEN GEBRUIKEN
const express = require('express');
const app = express();

// LOCALHOST PORT //
const PORT = process.env.PORT || 8000

// NODIG OM DATA OP EEN DYNAMISCHE MANIER IN TE LADEN
const path = require('path');
const fs = require('fs');
const jsonData = fs.readFileSync('static/data/data.json', 'utf8');
const myData = JSON.parse(jsonData);

//  NODIG OM .ENV BESTAND IN TE LADEN
require('dotenv').config()

// MONGO DB CONNECTIE 
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+server://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS + '@' +
process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w-majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB!');
    }
})

// VIEW ENGINES INLADEN
app.set('view engine', 'ejs');
app.set('views', 'view');

// STATIC CONTENT INLADEN
app.use(express.static("static"));

// INDEX.EJS INLADEN
app.get('/index', onHome);
function onHome(req, res) {
    res.render('index.ejs', {
        firstName: myData[0].firstName
    })
}

// PROFIEL-BEWERKEN.EJS INLADEN
app.get('/profiel-bewerken', profielBewerken);
function profielBewerken(req, res) {
    res.render('profiel-bewerken.ejs');
}

// 404 PAGE
app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Deze pagina kan niet gevonden worden.</h1>")
})

// LOCALHOST LATEN WERKEN
app.listen(PORT, console.log(`Running on port: ${PORT}`));
