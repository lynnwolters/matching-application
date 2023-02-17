const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000

app.get('/', onHome).listen(PORT, console.log('Running on port: ${PORT}'));

function onHome(req, res) {
    res.send('')
}
