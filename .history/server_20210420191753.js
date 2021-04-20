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

app.get((req, res, next) => {
    if (req.cookies.signedPetition) {
        res.redirect('/thanks');
    } else {
        next();
    }
});

app.use(express.static('public'));

app.use(express.urlencoded());

app.get('/', (req, res) => {
    //console.log('a request to the / route was made');
    res.redirect('/petition');
});

app.get('/petition', (req, res) => {
    res.render('petition', {
        layout: 'main',
    });
});

app.post('petition', (req, res) => {
    console.log('Post request made');
    res.cookies('signedPetition', 'yes');
    res.redirect('/thanks');
});

app.get('thanks', (req, res) => {
    if (req.cookies.signedPetition != "true")
});

// app.get('/add-actor', (req, res) => {
//     db.addActor('Glenn Close', 70, 3).then((result) =>
//         console.log('result: ', result)
//     );
// });
app.listen(8080, () => console.log('Server is listening'));
