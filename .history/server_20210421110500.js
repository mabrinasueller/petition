const express = require('express');
const app = express();
//gets the modules from db.js
const { petition, getNames } = require('./db');
//gets handlebars
const hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
//gets cookie parser
// const cp = require('cookie-parser');
// app.use(cp());
const cookieSession = require('cookie-session');
//let bodyParser = require('body-parser');

//console.log('db: ', db);
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

const { COOKIE_SECRET } = require('./secrets.json');

// app.get((req, res, next) => {
//     if (req.cookies.signedPetition != true) {
//         res.redirect('/petition');
//     } else {
//         next();
//     }
// });

app.use(express.static('public'));

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
    petition(firstName, lastName, signature)
        .then(() => {
            res.cookies('signedPetition', 'true');
            res.redirect('/thanks');
        })
        .catch((error) => {
            console.log('Error was thrown: ', error).toggleClass('hidden');
        });
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

app.get('/signers', (req, res) => {
    if (req.cookies.signedPetition != true) {
        res.redirect('/petition');
    }
    getNames().then(() => {
        res.render('signers', {
            layout: 'main',
            signers: firstName,
            lastName,
        });
    });
});

app.listen(8080, () => console.log('Server is listening'));
