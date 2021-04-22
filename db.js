const spicedPg = require('spiced-pg');
const db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');

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

module.exports.petition = (userId, signature) => {
    return db.query(
        `
        INSERT INTO signatures ( user_Id, signature ) VALUES ($1, $2)
        RETURNING id
    `,
        [userId, signature]
    );
};

module.exports.getSignature = (userId) => {
    return db.query(`SELECT signature FROM signatures WHERE user_Id = $1`, [
        userId,
    ]);
};

module.exports.getNames = () => {
    return db.query(`SELECT first_name, last_name FROM users`);
};
