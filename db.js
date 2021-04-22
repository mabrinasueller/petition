const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

module.exports.petition = (signature, userId) => {
    return db.query(
        `
        INSERT INTO signatures (signature, userId) VALUES ($1, $2),
        RETURNING id
    `,
        [signature, userId]
    );
};

module.exports.getNames = () => {
    return db.query(`SELECT first_name, last_name FROM signatures`);
};

module.exports.getSignature = (signatureId) => {
    return db.query(
        `SELECT signature FROM signatures WHERE id = ${signatureId}`
    );
};

module.exports.insertUser = (firstName, lastName, email, hashedPassword) => {
    return db.query(
        `INSERT INTO users (first_name, last_name, email, password_hash) 
    VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstName, lastName, email, hashedPassword]
    );
};

module.exports.registeredUser = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};
