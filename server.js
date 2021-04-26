const express = require('express');
const app = express();
//gets the modules from db.js
const {
    petition,
    getNames,
    getSignature,
    insertUser,
    registeredUser,
    insertProfile,
    getNamesByCity,
    getUser,
    updateUser,
    updateUserPw,
    updateProfile,
    deleteSignature,
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

app.use((req, res, next) => {
    const request = ['/profile', '/petition', '/thanks', '/signers'];
    if (request.includes(req.url) && !req.session.userId) {
        return res.redirect('/login');
    }
    next();
});

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register', {
        layout: 'main',
    });
});

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    hash(password).then((hashedPassword) => {
        insertUser(firstName, lastName, email, hashedPassword)
            .then((result) => {
                console.log('insertUser: ', result.rows);
                const { id } = result.rows[0];
                req.session.userId = id;
                res.redirect('/profile');
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

    registeredUser(email)
        .then((result) => {
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

app.get('/profile', (req, res) => {
    res.render('profile', {
        layout: 'main',
    });
});

app.post('/profile', (req, res) => {
    const { userId } = req.session;
    let { age, city, url } = req.body;

    if (
        url.length !== 0 &&
        !url.startsWith('https://') &&
        !url.startsWith('http://')
    ) {
        url = `http://${url}`;
    }
    insertProfile(userId, age.length !== 0 ? age : null, city, url)
        .then(() => {
            res.redirect('petition');
        })
        .catch((error) => {
            console.log('error', error);
            res.redirect('profile');
        });
});

app.get('/petition', (req, res) => {
    getSignature(req.session.userId).then((result) => {
        if (result.rows.length === 0) {
            res.render('petition', {
                layout: 'main',
            });
            return;
        }
        return res.redirect('/thanks');
    });
});

app.post('/petition', (req, res) => {
    const { signature } = req.body;
    const { userId } = req.session;

    petition(userId, signature)
        .then(() => {
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
            if (result.rows.length === 0) {
                return res.redirect('/petition');
            }

            const { signature } = result.rows[0];

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
    getSignature(req.session.userId).then((result) => {
        if (result.rows.length === 0) {
            return res.redirect('/petition');
        }
    });
    getNames()
        .then((result) => {
            console.log('result', result.rows);
            res.render('signers', {
                layout: 'main',
                signers: result.rows,
            });
        })
        .catch((error) => {
            console.log('Error was thrown: ', error);
        });
});

app.get('/signers/:city', (req, res) => {
    getSignature(req.session.userId).then((result) => {
        if (result.rows.length === 0) {
            return res.redirect('/petition');
        }
    });
    getNamesByCity(req.params.city)
        .then((result) => {
            res.render('signers', {
                layout: 'main',
                signers: result.rows,
                fromCity: req.params.city,
            });
        })
        .catch((error) => {
            console.log('error)', error);
        });
});

app.get('/profile/edit', (req, res) => {
    getUser(req.session.userId).then((result) => {
        console.log('result', result.rows);
        res.render('edit', {
            layout: 'main',
            editUser: result.rows,
        });
    });
});

app.post('/profile/edit', (req, res) => {
    const { userId } = req.session;
    const { firstName, lastName, email, password, age, city, url } = req.body;
    if (password.length !== 0) {
        hash(password).then((hashedPassword) => {
            Promise.all([
                updateUser(firstName, lastName, email, userId),
                updateUserPw(hashedPassword, userId),
                updateProfile(age, city, url, userId),
            ])
                .then(() => res.redirect('/thanks'))
                .catch((error) => console.log('error', error));
        });
    } else {
        Promise.all([
            updateUser(firstName, lastName, email, userId),
            updateProfile(age, city, url, userId),
        ])
            .then(() => res.redirect('/profile/edit'))
            .catch((error) => console.log('error', error));
    }
});

app.post('/thanks', (req, res) => {
    deleteSignature(req.session.userId)
        .then(() => res.redirect('/petition'))
        .catch((error) => console.log('error', error));
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('login');
});

app.listen(8080, () => console.log('Server is listening'));
