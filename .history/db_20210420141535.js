const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:spicedling:password@localhost:5432/actors');

module.exports.getCities = () => {
    return db.query('SELECT * FROM actors');
};
