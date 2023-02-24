import express, { Request, Response } from 'express'
import productStore from '../models/products_model'
import Product from '../types/product-type'
import checkAuth from '../middleware/authentication-middleware'
import {
  productBodyValidationRules,
  productParamsValidationRules,
  checkFunc,
} from '../middleware/validation-middleware'

// calling Index method from model to serve call get verb /orders
const store = new productStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

// calling Index method from model to serve call get verb /orders/id:
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
// calling Index method from model to serve call post verb /orders and rip data from request body:
const create = async (req: Request, res: Response) => {
  const product: Product = {
    product_name: req.body.product_name,
    price: req.body.price,
  }
  try {
    const newProductRec = await store.create(product)
    res.json(newProductRec)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
} // End of create Method

const delete_product = async (req: Request, res: Response) => {
  try {
      const pdelete = store.delete(req.params.id)
      res.json(pdelete)
  } catch (err) {
      res.status(400)
      res.json(err)
  }

};
const productRoutes = (app: express.Application) => {
  app.get('/products',index)
  app.get(
    '/products/:id',
    productParamsValidationRules,
    checkFunc,
    show
  )
  app.post(
    '/products',
    checkAuth,
    productBodyValidationRules,
    checkFunc,
    create
  )
  app.delete(
    '/products/:id',
    checkAuth,
    productParamsValidationRules,
    checkFunc,
    delete_product
  )
};

export default productRoutes
