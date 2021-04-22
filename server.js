const express = require('express');
const app = express();
//gets the modules from db.js
const {
    petition,
    getNames,
    getSignature,
    insertUser,
    registeredUser,
} = require('./db');
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

app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    hash(password).then((hashedPassword) => {
        insertUser(firstname, lastname, email, hashedPassword)
            .then((result) => {
                console.log('insertUser: ', result.rows);
                const { id } = result.rows[0];
                req.session.userId = id;
                res.redirect('/petition');
            })
            .catch((error) => {
                console.log('Error was thrown: ', error);
                res.render('register', {
                    layout: 'main',
                    error: true,
                });
            });
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        layout: 'main',
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // console.log('password', password);
    // console.log('email', email);
    // console.log('req.body', req.body);

    registeredUser(email)
        .then((result) => {
            console.log(result.rows.length);
            if (result.rows.length === 0) {
                res.render('login', {
                    layout: 'main',
                    noUser: true,
                });
                return;
            }
            compare(password, result.rows[0].password_hash).then((match) => {
                if (match) {
                    req.session.userId = result.rows[0].id;
                    res.redirect('/petition');
                } else {
                    res.render('login', {
                        layout: 'main',
                        wrongPassword: true,
                    });
                }
            });
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
            res.render('login', {
                layout: 'main',
                error: true,
            });
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
    //console.log('Post request made');
    const { signature } = req.body;
    const { userId } = req.session;

    petition(userId, signature)
        .then((result) => {
            console.log(result);
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
    getSignature(req.session.userId)
        .then((result) => {
            console.log('result', result);

            if (result.rows.length === 0) {
                return res.redirect('/petition');
            }

            const { signature } = result.rows[0];
            console.log('signature ', signature);

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
    getNames(req.session.userId)
        .then((result) => {
            if (result.rows[0].length === 0) {
                res.redirect('/petition');
            }
            res.render('signers', {
                layout: 'main',
                signers: result.rows,
            });
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
        });
});

app.listen(8080, () => console.log('Server is listening'));
