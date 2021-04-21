const express = require('express');
const app = express();
//gets the modules from db.js
const { petition, getNames } = require('./db');
//gets express.handlebars
const hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

const cookieSession = require('cookie-session');
const csurf = require('csurf');
const { COOKIE_SECRET } = require('./secrets.json');

app.use(express.urlencoded({ extended: false }));
app.use(csurf());

app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.static('public'));

//redirects the user automatically to the /petition route
app.get('/', (req, res) => {
    //console.log('a request to the / route was made');
    res.redirect('/petition');
});

app.get('/petition', (req, res) => {
    if (req.session.signatureId) {
        return res.redirect('/thanks');
    }
    res.render('petition', {
        layout: 'main',
    });
});

app.post('/petition', (req, res) => {
    console.log('Post request made');
    const { firstname: firstName, lastname: lastName, signature } = req.body;

    petition(firstName, lastName, signature)
        .then(() => {
            res.session.signatureId = id;
            res.redirect('/thanks');
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
            res.render('petition', {
                layout: 'main',
            });
            //.toggleClass('hidden');
        });
});

app.get('/thanks', (req, res) => {
    if (!req.session.signatureId) {
        res.redirect('/petition');
    } else {
        res.render('thanks', {
            layout: 'main',
        });
    }
});

app.get('/signers', (req, res) => {
    if (!req.session.signatureId) {
        res.redirect('/petition');
    }
    getNames()
        .then((signers) => {
            console.log(signers.rows);
            res.render('signers', {
                layout: 'main',
                signers: signers.rows,
            });
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
        });
});

app.listen(8080, () => console.log('Server is listening'));
