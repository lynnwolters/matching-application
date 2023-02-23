const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const path = require('path');

app.set('view engine', 'ejs');
app.set('views' + '/views');

app.get('/', function(req, res) {
    res.render('index', { title: 'My Website' });
});

app.use(express.static("static"));

app.get('/index', onHome);
function onHome(req, res) {
    res.sendFile('view/index.ejs');
}

app.get('/profiel-bewerken', profielBewerken);
function profielBewerken(req, res) {
    res.sendFile('view/profiel-bewerken.ejs');
}

app.listen(PORT, console.log('Running on port: ${PORT}'));

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})
