import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users-handler'
import orderRoutes from './handlers/orders_handler'
import productRoutes from './handlers/products_handler'
import dashboardRoutes from './handlers/dashboard_handler'

const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.send(
    `<h4>Welcome to :StoreFront API Project</h4><br><ul><li>end point to register user: /register</li>
    <li>to login use: /login</li>
    <li>Products are /products and please refer to readme</li>
    <li>Orders /orders and please refer to readme</li>
    </ul>`
  )
})

// call the handlers for endpoints
userRoutes(app)
orderRoutes(app)
productRoutes(app)
dashboardRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
