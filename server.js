const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const path = require('path');
const fs = require('fs');
const jsonData = fs.readFileSync('static/data/data.json', 'utf8');
const myData = JSON.parse(jsonData);

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB!');
    }
})

app.set('view engine', 'ejs');
app.set('views', 'view');

app.use(express.static("static"));

app.get('/index', onHome);
function onHome(req, res) {
    res.render('index.ejs', {
        firstName: myData[0].firstName
    })
}

app.get('/profiel-bewerken', profielBewerken);
function profielBewerken(req, res) {
    res.render('profiel-bewerken.ejs');
}

app.listen(PORT, console.log('Running on port: ${PORT}'));

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})
