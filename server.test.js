const supertest = require('supertest');
const { app } = require('./server.js');
const cookieSession = require('cookie-session');

//testing test
// test('Request to /register is successful', () => {
//     return supertest(app)
//         .get('/register')
//         .then((res) => {
//             expect(res.statusCode).toBe(200);
//         });
// });

test('Logged out users are redirected ', () => {
    cookieSession.mockSessionOnce({});
    return supertest(app).get('/petition').expect(302);
});

test('Logged in users are redirected to /petition when attempting to go to /register or /login', () => {
    cookieSession.mockSessionOnce({
        userId: 5,
    });
    return supertest(app).get('/login').expect(302);
});

test('Logged in users who signed petition are redirected to /thanks when attempting to go to /petition or submit signature', () => {
    cookieSession.mockSessionOnce({
        userId: 5,
    });
    return supertest(app).get('/petition').expect(302);
});

test('Logged in users who have not signed petition are redirected to /petition when attempting to go to /thanks or /signers', () => {
    cookieSession.mockSessionOnce({
        signatureId: false,
    });
    return supertest(app).get('/thanks').expect(302);
});
