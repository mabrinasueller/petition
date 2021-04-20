const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

module.exports.getActors = () => {
    return db.query('SELECT * FROM actors');
};

module.exports.addActor = (name, age, oscars) => {
    const q = `
        INSERT INTO actors (Name, Age, "Number of Oscars") VALUES ($1, $2, $3)
    `;

    const params = [name, age, oscars];
    return db.query(q, params);
};
