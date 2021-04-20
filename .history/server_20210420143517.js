const express = require('express');
const app = express();
const db = require('./db');

console.log('db: ', db);

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('a request to the / route was made');
});

app.get('/actors', (req, res) => {
    db.getActors()
        .then((result) => {
            console.log('result.rows: ', result.rows);
        })
        .catch((err) => {
            console.log('err: ', err);
        });
});

app.listen(8080, () => console.log('Server is listening'));
