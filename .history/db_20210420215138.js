const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

module.exports.addActor = (firstName, lastName, signature) => {
   return db.query (`
        INSERT INTO signatures (first_name, last_name, signature) VALUES ($1, $2, $3)
    `,

    [first_name, last_name, signature];
    
   )
};
