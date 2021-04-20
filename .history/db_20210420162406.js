const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/actors');

module.exports.getActors = () => {
    return db.query('SELECT * FROM actors');
};

module.exports.addActor = (name, age, oscars) => {
    const q = `
        INSERT INTO actors (Name, Age, oscars) VALUES ($1, $2, $3)
    `;

    const params = [name, age, oscars];
    return db.query(q, params);
};
