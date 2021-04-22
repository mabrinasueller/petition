const { genSalt, hash, compare } = require('bcryptjs');
//generates a promise
exports.hash = (password) => genSalt().then((salt) => hash(password, salt));

exports.compare = compare;
