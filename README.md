# Storefront Backend Project
## Description
Build a Storefront Backend : Advanced Web Development egFWD course's Second Project
This project was structured from scratch considering `server.ts` from starter code.
## Environment
working under windows 11 with:
-Visual studio code Version 1.74.1
-nodeJs version: by Ps(power shell) command: node -v >> v18.12.1
-npm version : npm  version 8.19.2
-typescript installed : Version 4.9.3
-Postgres SQL server V15 with Pgadmin accampaigned with the setup
-express
-express-validate
-db-migrate for database versioning
### Database Tier
#### postgres SQL installation
Please download Postgres package from https://www.postgresql.org/download/
then perform installation and make sure to select the following components at installation time:
-PostgreSQL Server [Required]
-pgAdmin 4     [recommended]
-Stack Builder [optional]
-Command Line Tools [Required]
follow the wizard instructions and set a default database password and keep it in a safe place.

user and database creation instructions could be done via  psql cli as below sections

#### Create PGSql User
Using powershell in windows Environment [bash command for linux]
```sh
CREATE USER Man1 WITH PASSWORD 'R*escp45ofhq';
```
***** Man1 user is equal to windows user 
#### Create Databases for dev and test
CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;
#### Grant PG user privileges on Data Bases
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO Man1;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO Man1;

### environment variables
ENV=dev
==========DataBase Connection info===========
PG_HOST= DATABASE_SERVER
PG_DB=DATABASE_NAME
PG_TEST_DB=storefront_test
PG_USER=DATABASE_USER_NAME
PG_PASSWORD=DATABASE_CONNECTION_PASSWORD
PG_PORT = POSTGRES_PORT <DEFAULT PORT:5432>
========== Set Other needed Env Vars ===========
BCRYPT_PASSWORD= ANY_PASSWORD_OF CHOICE <STRONG ONE RECOMMENDED>
SALT_ROUNDS= INTEGER NUMBER 10 FOR INSTANCE
TOKEN_SECRET=ANY_TOKEN_SECRET <STRONG ONE RECOMMENDED>
### Database Version Management
This project uses 'db-migrate' the Database migration framework for node.js.

#### scripts for `storefront_dev` database
npm run devdb-up
npm run devdb-reset

#### scripts for `for storefront_test` database
npm run testdb-up
npm run testdb-reset

#### bcrypt hashing
User's password is senetive piece of information that needs to be stored in a secure form.
This project uses bcrypt package for hasing the password before saving it to database.
the hashing process not only hashes the password but also adds a salt secret to it.
the password is saved to database in hashed form Like: `$2b$10$5kgX9DH2EMO7Zvi7fXmnEu276.DTL/sjW5CyaYWSrsiU9AftyraYa`

## Project Dependencies
### Dependencies
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.13",
    "@types/jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validate": "^0.0.8",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^9.0.0",
    "jwt-decode": "^3.1.2",
### Dev-Dependencies
  "devDependencies": {
    "@types/express": "^4.17.15",
    "@types/jasmine": "^4.3.1",
    "@types/morgan": "^1.9.3",
    "@types/node": "^18.11.18",
    "@types/pg": "^8.6.6",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jasmine-ts": "^0.4.0",
    "nodemon": "^2.0.20",
    "prettier": "2.8.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.4",
    "jasmine": "^3.6.4",
    "jasmine-spec-reporter": "^7.0.0",
    "supertest": "^6.3.3"
  }
## Scripts
    "build": "npx tsc",
    "prettify": "prettier --config .prettierrc src/**/*.ts --write",
    "lint": "eslint . --ext .ts ",
    "lintfix": "eslint . --ext .ts --fix",
    "start": "nodemon src/server.ts",
    "start:prod": "npm run build && node dist/index.js",
    "jasmine": "npx tsc && jasmine",
    "dbtest": "set ENV=test&& npm run testdb-reset && npm run testdb-up &&jasmine-ts src/models/tests/**/*[sS]pec.ts",
    "apitest": "set ENV=test&& npm run testdb-reset && npm run testdb-up &&jasmine-ts src/serverSpec.ts&& npm run testdb-reset",
    "devdb-up": "db-migrate up --config ./database.json --e dev",
    "devdb-reset": "db-migrate reset --config ./database.json --e dev",
    "testdb-up": "db-migrate up --config ./database.json --e test",
    "testdb-reset": "db-migrate reset --config ./database.json --e test"
## prettier
this code has been prettified by prettier for node <npm run prettify>
## es-linted
this code has passed eslint check for node <npm run >
## JWT 
JWT: JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties
https://JWT.IO allows you to decode, verify JWT toke

This project uses JWT for authentication and in conjunction with authentication middleware to verify if the the user is authenticated and allowed to use certain routes.

## Middlewares
validation middleware: uses express-validator package and contains arrays of testing rules and reactions + checkFunc which is the checking function to make use of test arrays
authentication middleware: checks the user authentication and reponds with HTTP status error 401 (Access denied)
## Tests
using Jasmine libraries for typescript testings
database operations test using shortcut/script <npm run dbtest>
api end point series of test using shortcut/script <npm run apitest>

 `dbaseSpec.ts` contains database test for every model and database operation in a test environment denoted by ENV = 'test'

`serverSpec.ts` contains API tests for endpoints; testings were made on the testing environment and test datbase
## starting the project
eto make express start to listen and serve using <npm run start>
## Build 
this project can be built using npm run build and it trasnpiles to /dist dire
## api endpoints
### Users
#### Register (Create)
Route: '/register'
Verb/Method: [POST]
#### Login (Authenticate(show)) // Authentication by valid UserName and Password
Route: '/login'
Verb/Method: [GET]
### Products
#### Index  [token required]
Route: '/products'
Verb/Method: [GET]
#### Show [token required]
Route: '/products/:id'
Verb/Method: [GET]
#### Create [token required]
Route: '/products'
Verb/Method: [POST]
#### Delete [token required] (Cascade Delete is enabled! will not leave any orphaned records)
Route: '/products/:id'
Verb/Method: [DELETE]
### Orders
#### Index [token required]
Route: '/orders'
Verb/Method: [GET]
#### Show [token required]
Route: '/orders/order/:id'
Verb/Method: [GET]
#### Show By User [token required]
Route:'/orders/user/:id'
Verb/Method: [GET]
#### Create [token required]
Route: '/orders'
Verb/Method: [POST]
#### Set Order Status [token required]
Route: '/order/status'
Verb/Method: [PUT]
#### Top 5 products [token required] 
Route:'/dashboard/top_products'
Verb/Method: [GET]

## Screen Captures
Please refer to included folder named `Screen Captures` for design and build time live screen shots.

## Directory structure
+---migrations
|   |   20230107221500-users-table.js
|   |   20230107221633-orders-table.js
|   |   20230107221644-products-table.js
|   |   20230107221658-order-products-table.js
|   |   
|   \---sqls
|           20230107221500-users-table-down.sql
|           20230107221500-users-table-up.sql
|           20230107221633-orders-table-down.sql
|           20230107221633-orders-table-up.sql
|           20230107221644-products-table-down.sql
|           20230107221644-products-table-up.sql
|           20230107221658-order-products-table-down.sql
|           20230107221658-order-products-table-up.sql
|           
+---spec
|   \---support
|           jasmine.json
|           
\---src
    |   database.ts
    |   server.ts
    |   serverSpec.ts
    |   
    +---config
    |       envconfig.ts
    |       
    +---handlers
    |       dashboard_handler.ts
    |       orders_handler.ts
    |       products_handler.ts
    |       users-handler.ts
    |       
    +---middleware
    |       authentication-middleware.ts
    |       validation-middleware.ts
    |       
    +---models
    |   |   orders_model.ts
    |   |   products_model.ts
    |   |   users_model.ts
    |   |   
    |   \---tests
    |           dbaseSpec.ts
    |           
    +---services
    |       dashboard_service.ts
    |       
    +---tests
    |   \---helpers
    |           reporter.ts
    |           
    \---types
            order-details-type.ts
            order-type.ts
            product-type.ts
            user-type.ts
            users_orders_type.ts
|   .example.env
|   .eslintrc.json
|   .prettierignore
|   .prettierrc
|   database.json
|   package-lock.json
|   package.json
|   README.md
|   REQUIREMENTS.md
|   tsconfig.json

## Refrences
https://www.positronx.io/express-validator-tutorial-with-input-validation-examples/
https://www.tutorialspoint.com/jasminejs/jasminejs_null_check.htm
https://www.postgresql.org/docs/
https://jasmine.github.io/api/4.5/global.html#beforeAll
https://jwt.io/

