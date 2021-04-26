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

module.exports.insertProfile = (userId, age, city, url) => {
    return db.query(
        `INSERT INTO user_profiles (user_id, age, city, url) VALUES ($1, $2, $3, $4) RETURNING id`,
        [userId, age, city, url]
    );
};

module.exports.getUser = (userId) => {
    return db.query(
        `SELECT first_name, last_name, email, password_hash, age, city, url FROM users JOIN user_profiles ON user_profiles.user_id = users.id WHERE users.id = $1`,
        [userId]
    );
};

module.exports.updateUsers = (userId) => {
    return db.query(
        `UPDATE user SET first_name, last_name, email WHERE users.id = $1`,
        [userId]
    );
};
module.exports.updateUsersPw = (userId) => {
    return db.query(
        `UPDATE user SET first_name, last_name, email, password_hash WHERE users.id = $1`,
        [userId]
    );
};
module.exports.updateProfiles = (userId, age, city, url) => {
    return db.query(
        `INSERT INTO user_profiles (age, city, url) VALUES ($2, $3, $4)  `,
        [userId, age, city, url]
    );
};

module.exports.petition = (userId, signature) => {
    return db.query(
        `
        INSERT INTO signatures ( user_id, signature ) VALUES ($1, $2)
        RETURNING id
    `,
        [userId, signature]
    );
};

module.exports.getSignature = (userId) => {
    return db.query(`SELECT signature FROM signatures WHERE user_id = $1`, [
        userId,
    ]);
};

module.exports.getNames = () => {
    return db.query(
        `SELECT first_name, last_name, age, city, url FROM signatures INNER JOIN users ON signatures.user_id = users.id INNER JOIN user_profiles ON user_profiles.user_id = users.id`
    );
};

module.exports.getNamesByCity = (city) => {
    return db.query(
        `SELECT first_name, last_name, age, city, url FROM signatures INNER JOIN users ON signatures.user_id = users.id INNER JOIN user_profiles ON user_profiles.user_id = users.id WHERE LOWER(city) = LOWER($1)`,
        [city]
    );
};
