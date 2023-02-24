import Client from '../database'
import Product from '../types/product-type'

export default class productStore {
  // productStore class
  // index method
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT * FROM products_table ORDER BY product_name ASC`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(
        `Oops! Unable to retrieve Products list; Error: ${
          (err as Error).message
        }`
      )
    }
  }
  //show method
  async show(id: number | string): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT * FROM products_table WHERE product_id = ($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      
      throw new Error(
        `Oops! Unable to retrieve your Product ; Error: ${
          (err as Error).message
        }`
      )
    }
  }

  //create method
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products_table (product_name, price) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [p.product_name, p.price])
      const book = result.rows[0]
      conn.release()
      return book
    } catch (err) {
      throw new Error(
        `Oops! Sorry Unable to Create/add a new product ${p.product_name}; Error: ${err}`
      )
    }
  }
  //
  // delete method
  async delete(product_id: number | string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products_table WHERE product_id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [product_id])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(
        `Oops!Unable to delete Product ${product_id}. Error: ${err}`
      )
    }
  }

  // update method
  //  async update(p:Product): Promise<Product> {
  //     try {
  //   const sql = 'UPDATE products_table SET product_name = ($1) , price = ($2) WHERE product_id=($3) RETURNING *'
  //   const conn = await Client.connect()
  //   const result = await conn.query(sql, [p.product_name, p.price,p.product_id])
  //   const product = result.rows[0]
  //   conn.release()
  //   return product
  //     } catch (err) {
  //         throw new Error(`Oops!Unable to Update Product ${p.product_id}; Error: ${err}`)
  //     }
  // }
}
