DROP TABLE IF EXISTS signatures;

-- CREATE TABLE users (
--     id            SERIAL PRIMARY KEY,
--     first_name    VARCHAR NOT NULL CHECK (first_name <> ''),
--     last_name     VARCHAR NOT NULL CHECK (last_name <> ''),
--     email         VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
--     password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
--     created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE signatures (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR NOT NULL CHECK (first_name != ''),
    last_name VARCHAR NOT NULL CHECK (last_name != ''),
    signature VARCHAR NOT NULL CHECK (signature != ''),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)