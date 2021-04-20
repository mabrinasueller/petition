const express = require('express');
const app = express();
const db = require('./db');
const hb = require('express-handlebars');
const cp = require('cookie-parser');
let bodyParser = require('body-parser');

console.log('db: ', db);
app.use(cp());

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

express.urlencoded();

app.get('/', (req, res) => {
    //console.log('a request to the / route was made');
    res.redirect('/petition');
});

app.get('/petition', (req, res) => {
    res.render('petition', {
        layout: 'main',
    });
});

app.post('petition', (res, req) => {
    console.log('Post request made');
    res.cookies('signedPetition', 'yes');
    res.redirect('/thanks');
});

// app.get('/add-actor', (req, res) => {
//     db.addActor('Glenn Close', 70, 3).then((result) =>
//         console.log('result: ', result)
//     );
// });
app.listen(8080, () => console.log('Server is listening'));
