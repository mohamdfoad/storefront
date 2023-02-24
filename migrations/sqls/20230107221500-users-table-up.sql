 CREATE TABLE IF NOT EXISTS users_table  (
 user_id SERIAL PRIMARY KEY,
 username VARCHAR(25) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50)
 );
 