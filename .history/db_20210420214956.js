const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

module.exports.addActor = (firstName, lastName, signature) => {
    const q = `
        INSERT INTO actors (Name, Age, oscars) VALUES ($1, $2, $3)
    `;

    const params = [name, age, oscars];
    return db.query(q, params);
};
