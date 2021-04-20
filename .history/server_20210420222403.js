const express = require('express');
const app = express();
const db = require('./db');
const hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
const cp = require('cookie-parser');
app.use(cp());
let bodyParser = require('body-parser');

//console.log('db: ', db);
app.use(express.urlencoded({ extended: false }));

// app.get((req, res, next) => {
//     if (req.cookies.signedPetition != true) {
//         res.redirect('/petition');
//     } else {
//         next();
//     }
// });

app.use(express.static('/public'));

//redirects the user automatically to the /petition route
app.get('/', (req, res) => {
    //console.log('a request to the / route was made');
    res.redirect('/petition');
});

app.get('/petition', (req, res) => {
    if (req.cookies.signedPetition) {
        return res.redirect('/thanks');
    }
    res.render('petition', {
        layout: 'main',
    });
});

app.post('/petition', (req, res) => {
    //console.log('Post request made');
    const { firstname: firstName, lastname: lastName, signature } = req.body;
    res.cookies('signedPetition', 'yes');
    res.redirect('/thanks');
});

app.get('/thanks', (req, res) => {
    if (req.cookies.signedPetition != true) {
        res.redirect('/petition');
    } else {
        res.render('thanks', {
            layout: 'main',
        });
    }
});

app.get('/signers', (req, res) => {});

// app.get('/add-actor', (req, res) => {
//     db.addActor('Glenn Close', 70, 3).then((result) =>
//         console.log('result: ', result)
//     );
// });
app.listen(8080, () => console.log('Server is listening'));
