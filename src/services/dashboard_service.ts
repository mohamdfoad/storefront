import Client from '../database'
import users_orders from '../types/users_orders_type'

export default class dashboardStore {
  // index method
  //latest 5 orders with their details
  async index(): Promise<users_orders[]> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT users_table.user_id,users_table.username,orders_table.order_id,orders_table.completed,orders_table.order_timestamp AS OrderTMSTMP,products_table.product_name,order_details.quantity,products_table.product_id 
                    from users_table INNER JOIN orders_table ON users_table.user_id = orders_table.user_id INNER JOIN order_details ON orders_table.order_id = order_details.order_id_fk
                     INNER JOIN products_table ON order_details.product_id_fk = products_table.product_id ORDER BY orders_table.order_id ASC LIMIT 5`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      console.log(err)
      throw new Error(
        `Oops! Unable to retrieve Orders list; Error: ${(err as Error).message}`
      )
    }
  }

  // Get all users that have made orders
  async topProductsPurchases(): Promise<
    { product_name: string; price: number }[]
  > {
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT products_table.product_id, products_table.product_name, products_table.price , order_details.rec_timestamp FROM products_table INNER JOIN order_details ON products_table.product_id = order_details.product_id_fk ORDER BY order_details.rec_timestamp DESC LIMIT 5'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Oops! unable to get top 5 products; Error: ${err}`)
    }
  }
}
