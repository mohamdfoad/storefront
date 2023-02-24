import dotenv from 'dotenv'
import { Pool } from 'pg'
import config from './config/envconfig'
// Initializing environment variables
dotenv.config()
// refrencing to environment variables:
const { ENV } = process.env

let client: Pool = new Pool()
// passing Env Vars to PG Pool
if (ENV?.trim() == 'test') {
  client = new Pool({
    host: config.PG_HOST,
    database: config.PG_TEST_DB,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
  })
}

if (ENV?.trim() == 'dev') {
  client = new Pool({
    host: config.PG_HOST,
    database: config.PG_DB,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
  })
}

export default client
