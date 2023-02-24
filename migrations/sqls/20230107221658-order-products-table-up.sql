CREATE TABLE IF NOT EXISTS  order_details 
(
    detail_id serial PRIMARY KEY,
    order_id_fk INTEGER  REFERENCES orders_table(order_id) ON DELETE CASCADE NOT NULL,
    product_id_fk INTEGER REFERENCES products_table(product_id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL,
    rec_timestamp TIMESTAMP DEFAULT now()
);