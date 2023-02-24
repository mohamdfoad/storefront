import express, { Request, Response } from 'express'
import dashboardStore from '../services/dashboard_service'
import checkAuth from '../middleware/authentication-middleware'

const dashboard = new dashboardStore()

const index = async (_req: Request, res: Response) => {
  try {
      const oDetails = await dashboard.index()
  res.json(oDetails)
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

const topProductsPurchases = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.topProductsPurchases()
    res.json(products)  
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

const dashboardRoutes = (app: express.Application) => {
  app.get('/dashbaord/last5', checkAuth, index)
  app.get('/dashboard/top_products', checkAuth, topProductsPurchases)
}

export default dashboardRoutes
