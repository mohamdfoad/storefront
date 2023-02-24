## API Endpoints
### Users
#### Register (Create)
Route: '/register'
Verb/Method: [POST]
Example: localhost:3000/register
Request Body:
 {
   "username": "sysadmin",
   "password": "ooGxzchas20918093hkjsahf",
   "first_name": "Mohamed",
   "last_name": "Foad"
           
   }

   Example Response:
{
  "user_id": 17,
  "username": "sysadmin",
  "password": "$2b$10$r2Kbmkkd2bLeSlXUsXCmC.EZM3wyHl3LOBFdft78z7rZ918nFHGSa",
  "first_name": "Mohamed",
  "last_name": "Foad"
}


#### Login (Authenticate(show)) // Authentication by valid UserName and Password
Route: '/login'
Verb/Method: [GET]
Example: localhost:3000/login
Request Body:
 {
   "username": "sysadmin",
   "password": "ooGxzchas20918093hkjsahf"
   }
Example Response:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoic3lzYWRtaW4yIiwiZmlyc3RfbmFtZSI6Ik1vaGFtZWQiLCJsYXN0X25hbWUiOiJGb2FkIn0sImlhdCI6MTY3NDIzMTExOH0.-LDL78uvw299Stg7E_Ws_M9ZgI1RRvZCgZimAM1gs3w"

#### Show user By Username [token required]
Route: '/users/username/:username'
Verb/Method: [GET]
Example: localhost:3000/users/username/admin
Request Body:NA
Example Response:
{
  "username": "admin",
  "first_name": "Admin",
  "last_name": "sys"
}

#### List all users [token required]
Route: '/users'
Verb/Method: [GET]
Example: localhost:3000/users
Request Body:NA
Example Response:
[
  {
    "username": "admin",
    "first_name": "Admin",
    "last_name": "sys"
  },
  {
    "username": "mada",
    "first_name": "Hamada",
    "last_name": "Foad"
  },
  {
    "username": "sysadmin",
    "first_name": "Mohamed",
    "last_name": "Foad"
  },
  {
    "username": "sysadmin2",
    "first_name": "Mohamed",
    "last_name": "Foad"
  },
  {
    "username": "testU1",
    "first_name": "test User fname",
    "last_name": "test user lname"
  },
  {
    "username": "User_2",
    "first_name": "user1 fn",
    "last_name": "user1 .ln"
  },
  {
    "username": "user3",
    "first_name": "user3 fn",
    "last_name": "user3 .ln"
  }
]

### Products

#### Index  
Route: '/products'
Verb/Method: [GET]
Example: localhost:3000/products
Request body:NA

#### Show
Route: '/products/:id'
Verb/Method: [GET]
Example: localhost:3000/products/8
Request body:NA


#### Create [token required]
Route: '/products'
Verb/Method: [POST]
Example: localhost:3000/products
Request body:
 {
   "product_name": "Product Example 1",
   "price": "0.25"
   }



#### Delete [token required] (Cascade Delete is enabled! will not leave any orphaned records)
Route: '/products/:id'
Verb/Method: [DELETE]
Example: localhost:3000/products/16
Request body:NA


### Orders
#### Index [token required]
Route: '/orders'
Verb/Method: [GET]
Example: localhost:3000/orders [GET]
Request body:NA

#### Show [token required]
Route: '/orders/order/:id'
Verb/Method: [GET]
Example: localhost:3000/orders/order/1 [GET]
Request body:NA

#### Show By User [token required]
Route:'/orders/user/:id'
Verb/Method: [GET]
Example: localhost:3000/orders/user/1 [GET]
Request body:NA

#### Create [token required]
Route: '/orders'
Verb/Method: [POST]
Example:localhost:3000/orders 
Request body:
{
    "user_id":1
}

#### Set Order Status [token required]
Route: '/order/status'
Verb/Method: [PUT]
Example: localhost:3000/order/status [PUT]
Request body:
{
  "order_id":9,
  "completed":true
}
Example Response :
{
  "order_id": 9,
  "order_timestamp": "2023-01-13T04:15:00.360Z",
  "user_id_fk": 1,
  "completed": true
}

#### Add Product to Order detail
Route: '/orders/:id/addproduct'
Verb/Method: [POST]
Example: localhost:3000/orders/9/addproduct [POST]
Request body:
{
    "product_id_fk":12,
    "quantity": 5

}
Example Response:
{
  "detail_id": 30,
  "order_id_fk": 9,
  "product_id_fk": 13,
  "quantity": 5,
  "rec_timestamp": "2023-01-20T05:00:47.825Z"
}

#### Delete Order [token required] (Cascade Delete is enabled! will not leave any orphaned records)
Route: '/orders/delete/:id'
Verb/Method: [DELETE]
Example:localhost:3000/orders/delete/9
Request body:NA

### DashBoard
#### recent 5  Orders [token required] 
Route:'/dashbaord/last5' 
Verb/Method: [GET]
Example: localhost:3000/dashbaord/last5 [GET]
Request body:NA
Example Response:
[
  {
    "user_id": 1,
    "username": "admin",
    "order_id": 9,
    "completed": true,
    "ordertmstmp": "2023-01-13T04:15:00.360Z",
    "product_name": "Test Product Name",
    "quantity": 5,
    "product_id": 13
  },
  {
    "user_id": 1,
    "username": "admin",
    "order_id": 9,
    "completed": true,
    "ordertmstmp": "2023-01-13T04:15:00.360Z",
    "product_name": "Sugar Bag 1 KG",
    "quantity": 5,
    "product_id": 7
  },
  {
    "user_id": 1,
    "username": "admin",
    "order_id": 9,
    "completed": true,
    "ordertmstmp": "2023-01-13T04:15:00.360Z",
    "product_name": "Sugar Bag 1 KG",
    "quantity": 5,
    "product_id": 7
  },
  {
    "user_id": 1,
    "username": "admin",
    "order_id": 9,
    "completed": true,
    "ordertmstmp": "2023-01-13T04:15:00.360Z",
    "product_name": "Water Melon Cubes",
    "quantity": 2,
    "product_id": 4
  },
  {
    "user_id": 1,
    "username": "admin",
    "order_id": 9,
    "completed": true,
    "ordertmstmp": "2023-01-13T04:15:00.360Z",
    "product_name": "Water Melon Cubes",
    "quantity": 2,
    "product_id": 4
  }
]
#### Top 5 products [token required] 
Route:'/dashboard/top_products'
Verb/Method: [GET]
Example: localhost:3000/dashboard/top_products [GET]
Request body:NA
Example Response:
[
  {
    "product_id": 13,
    "product_name": "Test Product Name",
    "price": 25,
    "rec_timestamp": "2023-01-20T05:00:47.825Z"
  },
  {
    "product_id": 8,
    "product_name": "Crystal Oil corn 1 KG",
    "price": 80,
    "rec_timestamp": "2023-01-16T19:22:25.732Z"
  },
  {
    "product_id": 13,
    "product_name": "Test Product Name",
    "price": 25,
    "rec_timestamp": "2023-01-16T19:17:35.014Z"
  },
  {
    "product_id": 4,
    "product_name": "Water Melon Cubes",
    "price": 5.33,
    "rec_timestamp": "2023-01-14T10:23:05.766Z"
  },
  {
    "product_id": 4,
    "product_name": "Water Melon Cubes",
    "price": 5.33,
    "rec_timestamp": "2023-01-14T10:22:43.936Z"
  }
]

## Data Shapes
### Schema
#### User Entity
user_id SERIAL PRIMARY KEY,
 username VARCHAR(25) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50)
 
 #### product Entity
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL UNIQUE ,
  price FLOAT NOT NULL

#### Order Entity
 order_id serial PRIMARY KEY,
 order_timestamp TIMESTAMP NOT NULL DEFAULT now(),
 user_id INTEGER REFERENCES users_table(user_id) ON DELETE CASCADE NOT NULL,
 completed BOOLEAN DEFAULT 'false'

#### Orders product Relation (Many - to - Many solved by 2X one - to - Many the fk means forign Keys)
 detail_id serial PRIMARY KEY,
 order_id_fk INTEGER  REFERENCES orders_table(order_id) ON DELETE CASCADE NOT NULL,
 product_id_fk INTEGER REFERENCES products_table(product_id) ON DELETE CASCADE NOT NULL,
 quantity INTEGER NOT NULL,
 rec_timestamp TIMESTAMP DEFAULT now()

 ### database Tables
 #### Product

Table Description:
                                           Table "products_table"
    Column    |          Type          | Collation | Nullable |                      Default
--------------+------------------------+-----------+----------+----------------------------------------------------
 product_id   | integer                |           | not null | nextval('products_table_product_id_seq'::regclass)
 product_name | character varying(255) |           | not null |
 price        | double precision       |           | not null |
Indexes:
    "products_table_pkey" PRIMARY KEY, btree (product_id)
    "products_table_product_name_key" UNIQUE CONSTRAINT, btree (product_name)
Referenced by:
    TABLE "order_details" CONSTRAINT "order_details_product_id_fk_fkey" FOREIGN KEY (product_id_fk) REFERENCES products_table(product_id) ON DELETE CASCADE

- product_id 
- product_name
- price : float


#### Users
TableName: users_table
Table Description:
                                        Table "users_table"
   Column   |          Type          | Collation | Nullable |                   Default
------------+------------------------+-----------+----------+----------------------------------------------
 user_id    | integer                |           | not null | nextval('users_table_user_id_seq'::regclass)
 username   | character varying(25)  |           | not null |
 password   | character varying(255) |           | not null |
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           |          |
Indexes:
    "users_table_pkey" PRIMARY KEY, btree (user_id)
    "users_table_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
    TABLE "orders_table" CONSTRAINT "orders_table_user_id_fk_fkey" FOREIGN KEY (user_id_fk) REFERENCES users_table(user_id) ON DELETE CASCADE


#### Orders
TableName:orders_table
Table Description:
                                              Table "orders_table"
     Column      |            Type             | Collation | Nullable |                    Default
-----------------+-----------------------------+-----------+----------+------------------------------------------------
 order_id        | integer                     |           | not null | nextval('orders_table_order_id_seq'::regclass)
 order_timestamp | timestamp without time zone |           | not null | now()
 user_id_fk      | integer                     |           | not null |
 completed       | boolean                     |           |          | false
Indexes:
    "orders_table_pkey" PRIMARY KEY, btree (order_id)
Foreign-key constraints:
    "orders_table_user_id_fk_fkey" FOREIGN KEY (user_id_fk) REFERENCES users_table(user_id) ON DELETE CASCADE
Referenced by:
    TABLE "order_details" CONSTRAINT "order_details_order_id_fk_fkey" FOREIGN KEY (order_id_fk) REFERENCES orders_table(order_id) ON DELETE CASCADE

#### OrdersDetails
Tab;e Name: users_table
Table Description:
                                        Table "users_table"
   Column   |          Type          | Collation | Nullable |                   Default
------------+------------------------+-----------+----------+----------------------------------------------
 user_id    | integer                |           | not null | nextval('users_table_user_id_seq'::regclass)
 username   | character varying(25)  |           | not null |
 password   | character varying(255) |           | not null |
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           |          |
Indexes:
    "users_table_pkey" PRIMARY KEY, btree (user_id)
    "users_table_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
    TABLE "orders_table" CONSTRAINT "orders_table_user_id_fk_fkey" FOREIGN KEY (user_id_fk) REFERENCES users_table(user_id) ON DELETE CASCADE

#### DashBoard
-Recent 5 Orders
 user_id | username | order_id | completed |        ordertmstmp        |   product_name    | quantity | product_id
---------+----------+----------+-----------+---------------------------+-------------------+----------+------------
       1 | admin    |        9 | t         | 2023-01-13 06:15:00.36037 | Test Product Name |        5 |         13
       1 | admin    |        9 | t         | 2023-01-13 06:15:00.36037 | Sugar Bag 1 KG    |        5 |          7
       1 | admin    |        9 | t         | 2023-01-13 06:15:00.36037 | Sugar Bag 1 KG    |        5 |          7
       1 | admin    |        9 | t         | 2023-01-13 06:15:00.36037 | Water Melon Cubes |        2 |          4
       1 | admin    |        9 | t         | 2023-01-13 06:15:00.36037 | Water Melon Cubes |        2 |          4
(5 rows)


-Top_5 Products
 product_id |     product_name      | price |       rec_timestamp
------------+-----------------------+-------+----------------------------
         13 | Test Product Name     |    25 | 2023-01-20 07:00:47.825662
          8 | Crystal Oil corn 1 KG |    80 | 2023-01-16 21:22:25.732015
         13 | Test Product Name     |    25 | 2023-01-16 21:17:35.014362
          4 | Water Melon Cubes     |  5.33 | 2023-01-14 12:23:05.7668
          4 | Water Melon Cubes     |  5.33 | 2023-01-14 12:22:43.936504
(5 rows)


## All token auth headers uses `Beare ` Token