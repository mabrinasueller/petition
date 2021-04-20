const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:spicedling:password@localhost:5432/actors');

module.exports.getActors = () => {
    return db.query('SELECT * FROM actors');
};

module.exports.addActor = (name, age, 'Number of Oscars') => {
    return db.query(
        INSERT INTO actors (Name, Age, "Number of Oscars") VALUES (${Name}), ${Age}, ${"Number of Oscras"})
    )
};
