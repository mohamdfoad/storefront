CREATE TABLE IF NOT EXISTS products_table
(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL UNIQUE ,
    price FLOAT NOT NULL
    );
