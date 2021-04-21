const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

module.exports.petition = (firstName, lastName, signature) => {
    const q = `
        INSERT INTO signatures (first_name, last_name, signature) VALUES ($1, $2, $3)
    `;

    const params = [firstName, lastName, signature];
    return db.query(q, params);
};

module.exports.getNames = () => {
    return db.query(`SELECT first_name, last_name FROM signatures`);
};

module.exports.getSignature = (signatureId) => {
    return db.query(
        `SELECT signature FROM signatures WHERE id = ${signatureId}`
    );
};
