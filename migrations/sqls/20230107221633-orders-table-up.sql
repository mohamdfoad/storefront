CREATE TABLE IF NOT EXISTS orders_table 
(
    order_id serial PRIMARY KEY,
    order_timestamp TIMESTAMP NOT NULL DEFAULT now(),
    user_id INTEGER REFERENCES users_table(user_id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT 'false'
);