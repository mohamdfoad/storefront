import Client from '../database'
import Order from '../types/order-type'
import users_orders from '../types/users_orders_type'
import order_details from '../types/order-details-type'

  // orderStore class
export default class orderStore {


  // index method
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders_table ORDER BY order_id ASC'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
       throw new Error(
        `Oops! Unable to retrieve Orders list; Error: ${(err as Error).message}`
      )
    }
  }
  //show method
  async show(id: string | number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT * FROM orders_table WHERE order_id = ($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Oops! Unable to retrieve your Order with ID: ${id} ; Error: ${
          (err as Error).message
        }`
      )
    }
  }
  async showByUser(userid: string | number): Promise<users_orders[]> {
   
    try {
      const conn = await Client.connect()

      const sql = `SELECT users_table.user_id,users_table.username,orders_table.order_id,completed,orders_table.order_timestamp AS OrderTMSTMP,product_name,quantity,product_id 
                  from users_table INNER JOIN orders_table ON users_table.user_id = orders_table.user_id INNER JOIN order_details ON orders_table.order_id = order_details.order_id_fk
                  INNER JOIN products_table ON order_details.product_id_fk = products_table.product_id WHERE users_table.user_id  = ($1) ORDER BY order_id ASC`
      let modUID
      if (typeof userid == 'string') {
        modUID = parseInt(userid)
      } else {
        modUID = userid
      }
      const result = await conn.query(sql, [modUID])
    
      conn.release()
      return result.rows
    } catch (err) {
  
      throw new Error(
        `Oops! Unable to retrieve your user's orders with user ID: ${userid} ; Error: ${err}`
      )
    }
  }
  //create order method
  async create(o: Order): Promise<Order> {
    
    try {
      const sql = 'INSERT INTO orders_table (user_id) VALUES($1) RETURNING *'

      const conn = await Client.connect()
      const result = await conn.query(sql, [o.user_id])
      const order = result.rows[0]
      conn.release()
      return order
     
    } catch (err) {
      throw new Error(
        `Oops! Sorry Unable to Create/add a new order for user ${o.user_id}; Error: ${err}`
      )
    }
  }

  //patch or Update ooperation for order completed flag
  async setOrderStatus(
    order_id: string | number,
    completed: boolean
  ): Promise<Order> {
    try {
      const sql =
        'UPDATE orders_table SET completed = ($1) WHERE order_id = ($2) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [completed, order_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
     
      throw new Error(
        `Oops! Sorry Unable to set order status for Order: ${order_id}; Error: ${err}`
      )
    }
  }

  // delete method ; refrential integrity requires to cascade delete not to make orphaned records
  //OR
  //Create an error because of relations;
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE  FROM orders_table WHERE order_id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const numberOfDeletedRows = result.rows[0]
      conn.release()
      return numberOfDeletedRows
    } catch (err) {
      throw new Error(`Oops! Could not delete book ${id}. Error: ${err}`)
    }
  }

  //Inside Orders Model; many-to-many relationship; order_products table is updated from here!
  // add products to order method
  async addProduct(
    quantity: number,
    order_id_fk: string | number,
    product_id_fk: string | number
  ): Promise<order_details> {
    try {
      const sql =
        'INSERT INTO order_details (quantity, order_id_fk, product_id_fk) values ($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        quantity,
        order_id_fk,
        product_id_fk,
      ])
      const newrec = result.rows[0]
      conn.release()
      return newrec
    } catch (err) {
      
      throw new Error(
        `Oops! Unable to add product ID: ${product_id_fk} to order ID:  ${order_id_fk}; Error: ${err}`
      )
    }
  }
}
