const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:spicedling:password@localhost:5432/actors');

module.exports.getActors = () => {
    return db.query('SELECT * FROM actors');
};

module.exports.addActor = (name, age, 'Number of Oscars') => {
    const q = `
        INSERT INTO actors (Name, Age, "Number of Oscars") VALUES ($1, $2, $3)
    `;
    return db.query([name, age, 'Number of Oscars']);
};
