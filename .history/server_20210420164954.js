const express = require('express');
const app = express();
const db = require('./db');
const hb = require('express-handlebars');

console.log('db: ', db);

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('a request to the / route was made');
    res.render('petition', {
        layout: 'main',
    });
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

app.get('/add-actor', (req, res) => {
    db.addActor('Glenn Close', 70, 3).then((result) =>
        console.log('result: ', result)
    );
});
app.listen(8080, () => console.log('Server is listening'));
