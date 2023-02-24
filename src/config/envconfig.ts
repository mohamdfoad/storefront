import dotenv from 'dotenv'

//calling config method of environment process
dotenv.config()

const config = {
  PG_HOST: process.env.PG_HOST || '127.0.0.1',
  PG_DB: process.env.PG_DB,
  PG_TEST_DB: process.env.PG_TEST_DB || 'storefront_test',
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  NODE_ENV: process.env.dev,
  BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD,
  SALT_ROUNDS: process.env.SALT_ROUNDS || '6UnkDvNSrXPgiheNpoOeVg==',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'uykDvNSrXPgiheN54GFZwtw',
}

export default config
