import Client from '../database'
import user from '../types/user-type'
import config from '../config/envconfig'
import bcrypt from 'bcrypt'

const pepper = config.BCRYPT_PASSWORD
const saltRounds = config.SALT_ROUNDS

export default class userStore {
  // userStore class

  //Authenticate is considered a Show operation
  async authenticate(username: string, password: string): Promise<user | null> {
    let sql = `SELECT * FROM users_table WHERE username=($1)`
    let conn = await Client.connect()
    let result = await conn.query(sql, [username])
    conn.release()
    if (result.rowCount > 0) {
      let user = result.rows[0]
      if (bcrypt.compareSync(password + pepper, user.password)) {
        sql = `SELECT username,first_name,last_name FROM users_table WHERE username=($1)`
        try {
          conn = await Client.connect()
          result = await conn.query(sql, [username])
          user = result.rows[0]
        } catch (err) {
        return null;
        }

        conn.release()
        return user
      }
    }
    return null
  }

  // Create new user method Or register
  async register(u: user): Promise<user> {
    try {
      const sql = `INSERT INTO users_table (username, password, first_name, last_name) VALUES($1, $2, $3 , $4) RETURNING *`
      const hash_digest = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      )
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        u.username,
        hash_digest,
        u.first_name,
        u.last_name,
      ])
      const user = result.rows[0]
      return user
      conn.release()
    } catch (err) {

      throw new Error(
        `Oops! an Error occurred; unable to register; error: ${err}`
      )
    }
  } // end of method

  async index(): Promise<user[]> {
    try {
      const con = await Client.connect()
      const sql =
        'SELECT username,first_name,last_name FROM users_table ORDER BY username ASC'
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch (err) {
      throw new Error(`Oops! unable to get list of users; Error: ${err}`)
    }
  }

 async show(username:string): Promise<user> {
     try {
     
       const con = await Client.connect()
       const sql = 'SELECT username, first_name, last_name FROM users_table WHERE username = ($1)'
       const result = await con.query(sql,[username])
       con.release()
       return result.rows[0]
     } catch (err) {
       throw new Error(`Oops! unable to get your user; Error: ${err}`)
     }
    
   };

  async delete(username: string): Promise<number> {
     try {
       const sql = 'DELETE FROM users_table WHERE username=($1)'
       const conn = await Client.connect()
       const result = await conn.query(sql, [username])
       const numberOfDeletedRows = result.rowCount
       conn.release()
       return numberOfDeletedRows
     } catch (err) {
       console.log(err);
       throw new Error(`Oops !unable to delete user with : ${username}; Error: ${err}`)
     }
   };


} //End of userStore class
