const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const path = require('path');

app.use(express.static("static"));

app.get('/index', onHome);
function onHome(req, res) {
    res.sendFile(path.join(__dirname, 'view/index.html'));
}

app.get('/profiel-bewerken', profielBewerken);
function profielBewerken(req, res) {
    res.sendFile(path.join(__dirname, 'view/profiel-bewerken.html'));
}

app.listen(PORT, console.log('Running on port: ${PORT}'));
