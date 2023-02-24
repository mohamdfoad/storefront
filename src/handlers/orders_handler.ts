import express, { Request, Response } from 'express'
import OrderStore from '../models/orders_model'
import Order from '../types/order-type'
import checkAuth from '../middleware/authentication-middleware'

import {
  orderParamsValidationRules,
  orderBodyValidationRules,
  order_userParamsValidationRules,
  orderProductBodyValidationRules,
  orderStatusBodyValidationRules,
  checkFunc,
} from '../middleware/validation-middleware'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
      const orders = await store.index()
      res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}


const show = async (req: Request, res: Response) => {
  const orderid = req.params.id
  if (orderid && typeof parseInt(orderid) == 'number') {
    try {
  
      const orders = await store.show(req.params.id)
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  } else {
    res.status(400)
    res.json('id can not be empty')
  }
}
const showByUser = async (req: Request, res: Response) => {
  const userid = req.params.id
  
  if (userid) {
    try {
      const orders = await store.showByUser(userid)
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    // timestamp and completed flag has defaults by database no need to read them
  }
  try {
   
    const newOrderRec = await store.create(order)
    res.json(newOrderRec)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
} // End Of Create Method

const setOrderStatus = async (req: Request, res: Response) => {
  const orderid = req.body.order_id
  const completed = req.body.completed
  if (orderid && typeof parseInt(orderid) == 'number') {
    if (completed && typeof completed == 'boolean') {

      try {
        const order = await store.setOrderStatus(orderid, completed)
        res.json(order)
      } catch (err) {
        res.status(400)
        res.json(err)
      }
    } else {
      res.status(400)
      res.json('completed is required and must be true or false')
    }
  } else {
    res.status(400)
    res.json('id can not be empty')
  }
}

// Calling delete Order method
const orderdelete = async (req: Request, res: Response) => {
  try {
      const odelete = store.delete(req.params.id)
      res.json(odelete)
  } catch (err) {
    res.status(400)
    res.json(err)
  }

} // End of Delete Method

const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.id

  const product_id_fk: number = req.body.product_id_fk
  const quantity: number = parseInt(req.body.quantity)
  console.log(product_id_fk)
  try {
    const newProduct = await store.addProduct(quantity, order_id, product_id_fk)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}


// Order Routed

const orderRoutes = (app: express.Application) => {
  app.get('/orders', checkAuth, index)
  app.get(
    '/orders/order/:id',
    checkAuth,
    orderParamsValidationRules,
    checkFunc,
    show
  )
  app.get(
    '/orders/user/:id',
    checkAuth,
    order_userParamsValidationRules,
    checkFunc,
    showByUser
  )
  app.post('/orders', checkAuth, orderBodyValidationRules, checkFunc, create)
  app.put(
    '/order/status',
    checkAuth,
    orderStatusBodyValidationRules,
    checkFunc,
    setOrderStatus
  )
  // handler for many to many relation table orders_details
  app.post(
    '/orders/:id/addproduct',
    checkAuth,
    orderParamsValidationRules,
    orderProductBodyValidationRules,
    checkFunc,
    addProduct
  )
  app.delete(
    '/order/delete/:id',
    checkAuth,
    orderParamsValidationRules,
    checkFunc,
    orderdelete
  )
}
export default orderRoutes
