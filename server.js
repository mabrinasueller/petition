const express = require('express');
const app = express();
//gets the modules from db.js
const { petition, getNames, getSignature } = require('./db');
//gets express.handlebars
const hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

const cookieSession = require('cookie-session');
const { COOKIE_SECRET } = require('./secrets.json');
const csurf = require('csurf');
const { hash, compare } = require('./utils/bc');

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.urlencoded({ extended: false }));

app.use(csurf());

app.use(function (req, res, next) {
    res.setHeader('x-frame-options', 'deny');
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register', {
        layout: 'main',
    });
});

app.post("/register", (req,res) => {
    if 
})
app.get('/login', (req, res) => {
    res.render('login', {
        layout: 'main',
    });
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
    console.log(signature);
    petition(firstName, lastName, signature)
        .then((signers) => {
            console.log(signers);
            const { id } = signers.rows[0];
            req.session.signatureId = id;
            res.redirect('/thanks');
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
            res.render('petition', {
                layout: 'main',
                error: true,
            });
        });
});

app.get('/thanks', (req, res) => {
    if (!req.session.signatureId) {
        res.redirect('/petition');
    }
    console.log('Error');
    getSignature(req.session.signatureId)
        .then((signers) => {
            console.log(signers);
            const { signature } = signers.rows[0];
            res.render('thanks', {
                layout: 'main',
                signature: signature,
            });
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
        });
});

app.get('/signers', (req, res) => {
    if (!req.session.signatureId) {
        res.redirect('/petition');
    }
    getNames()
        .then((signers) => {
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
