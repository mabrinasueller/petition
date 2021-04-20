DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR NOT NULL CHECK (first_name != ""),
    last_name VARCHAR 
)