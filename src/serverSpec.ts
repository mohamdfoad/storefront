import supertest from 'supertest'
import jwt_decode from 'jwt-decode'
import app from './server'
import User from './types/user-type'
import Order from './types/order-type'
import Product from './types/product-type'
import Order_Detail from './types/order-details-type'

const req = supertest(app)
//const uStore = new userStore();
const user: User = {
  username: 'sysadmin',
  password: 'ooGxzchas20918093hkjsahf',
  first_name: 'Mohamed',
  last_name: 'Foad',
}
const product: Product = {
  product_name: 'Jasmine Testing Product',
  price: 50,
}
const order: Order = {
  user_id: 1,
}
const order_detail: Order_Detail = {
  order_id_fk: 1,
  product_id_fk: 1,
  quantity: 1,
}

let jwt_token: string
type JWT_decoded = { user: User }

describe('main endpoint `/` ', () => {
  it('it tests main route response', async () => {
    const res = await req.get('/')
    expect(res.status).toBe(200)
  })
})

describe('Register Route Test  `/register` ', () => {
  it('it tests Registration by a username and password', async () => {
    const res = await req
      .post('/register')
      .send(
        (({ username, password, first_name, last_name }) => ({
          username,
          password,
          first_name,
          last_name,
        }))(user)
      )
    expect(res.status).toBe(200)
    jwt_token = res.body
   
  })
})

describe('Authenticate Route Test  `/login` ', () => {
  it('it tests login with registered username and password', async () => {
    const res = await req
      .post('/login')
      .send((({ username, password }) => ({ username, password }))(user)) // Json content in body
    expect(res.status).toBe(200)
    jwt_token = res.body
    const decodedUser: User = (jwt_decode(res.body) as JWT_decoded).user
    expect(decodedUser.username).toEqual(user.username)
    expect(decodedUser.first_name).toEqual(user.first_name)
    expect(decodedUser.last_name).toEqual(user.last_name)
  })
})

describe('User index Route Test  `/users` ', () => {
  it('it tests inex method of users endpoint after login', async () => {
    const res = await req
      .get(`/users`)
      .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body[0].username).toEqual(user.username)
    expect(res.body[0].first_name).toEqual(user.first_name)
    expect(res.body[0].last_name).toEqual(user.last_name)
  })
});

describe('User Show Route Test  `/users/username/:username` ', () => {
  it('it tests Show method of users endpoint after login', async () => {
     const res = await req
    .get(`/users/username/${user.username}`)
    .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body.username).toEqual(user.username)
    expect(res.body.first_name).toEqual(user.first_name)
    expect(res.body.last_name).toEqual(user.last_name)
  })
})

// Products api routes tests
describe('Products Create Route Test  `/products` ', () => {
  it('it tests Create Product method of products endpoint after login', async () => {
    const res = await req
      .post('/products')
      .set({ Authorization: `Bearer ` + jwt_token })
      .send((({ product_name, price }) => ({ product_name, price }))(product)) // Json content in body
    expect(res.status).toBe(200)
    expect(res.body.product_name).toEqual(product.product_name)
    expect(res.body.price).toEqual(product.price)
    expect(res.body.product_id).toEqual(1)
  })
})

describe('Products index Route Test  `/products` ', () => {
  it('it tests inedx method of products endpoint after login', async () => {
    const res = await req
      .get('/products')
      //.set({ Authorization: `Bearer ` + jwt_token })
 
    expect(res.status).toBe(200)
    expect(res.body[0].product_name).toEqual(product.product_name)
    expect(res.body[0].price).toEqual(product.price)
  })
})

describe('Products Show Route Test  `/products/:id` ', () => {
  it('it tests Show product method of products endpoint after login', async () => {
    const res = await req
      .get('/products/1')
   //.set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body.product_name).toEqual(product.product_name)
    expect(res.body.price).toEqual(product.price)
    expect(res.body.product_id).toEqual(1)
  })
})
// Orders api routes test
//Sequence of tests > index, show by user, show,create order ,set status, delete order,delete product
//const extendedUser:User = {...user,user_id:1}
describe('Orders Create Route Test  `/orders` ', () => {
  it('it tests Create Order method of Orders endpoint after login', async () => {
    const res = await req
      .post('/orders')
      .set({ Authorization: `Bearer ` + jwt_token })
      .send((({ user_id }) => ({ user_id }))(order)) // Json content in body
    expect(res.status).toBe(200)
    expect(res.body.user_id).toEqual(1)
    expect(res.body.order_id).toEqual(1)
    expect(res.body.completed).toBeFalse()
  })
})

describe('Orders index Route Test  `/orders` ', () => {
  it('it tests inedx method of Orders endpoint after login', async () => {
    const res = await req
      .get('/orders')
      .set({ Authorization: `Bearer ` + jwt_token })
   
    expect(res.status).toBe(200)
    expect(res.body[0].order_id).toEqual(1)
    expect(res.body[0].user_id).toEqual(1)
    expect(res.body[0].completed).toBeFalse()
  })
})

describe('Orders Show Route Test  `/orders/:id` ', () => {
  it('it tests Show Order method of Orders endpoint after login', async () => {
    const res = await req
      .get('/orders/order/1')
      .set({ Authorization: `Bearer ` + jwt_token })

    expect(res.status).toBe(200)
    expect(res.body.order_id).toEqual(1)
    expect(res.body.user_id).toEqual(1)
    expect(res.body.completed).toBeFalse()
  })
})
//Calling add products to orders route first

describe('add Product to order details  `/orders/:id/addproduct [POST]` ', () => {
  it('it tests adding order details with product in hand for logged in user', async () => {
    const res = await req
      .post('/orders/1/addproduct')
      .set({ Authorization: `Bearer ` + jwt_token })
      .send(
        (({ product_id_fk, quantity }) => ({ product_id_fk, quantity }))(
          order_detail
        )
      ) // Json content in body
    expect(res.status).toBe(200)
    expect(res.body.detail_id).toEqual(1)
    expect(res.body.order_id_fk).toEqual(1)
    expect(res.body.product_id_fk).toEqual(1)
  })
})

describe('Orders ShowByUser Route Test  `/orders/user/:id` ', () => {
  it('it tests ShowByUser Orders method of Orders endpoint after login', async () => {
    const res = await req
      .get('/orders/user/1')
      .set({ Authorization: `Bearer ` + jwt_token })
   
    expect(res.status).toBe(200)
    expect(res.body[0].order_id).toEqual(1)
    expect(res.body[0].user_id).toEqual(1)
    expect(res.body[0].username).toEqual(`sysadmin`)
    expect(res.body[0].completed).toBeFalse()
    expect(res.body[0].ordertmstmp).toBeDefined()
    expect(res.body[0].quantity).toEqual(1)
    expect(res.body[0].product_id).toEqual(1)
  })
})

const o: Order = {
  user_id: 1,
  order_id: 1,
  completed: true,
}

describe('Order Status Set Route Test  `/order/status` ', () => {
  it('it tests completed update to be true after login', async () => {
    const res = await req
      .put('/order/status')
      .send((({ order_id, completed }) => ({ order_id, completed }))(o)) // Json content in body
      .set({ Authorization: `Bearer ` + jwt_token })
   
    expect(res.status).toBe(200)
    expect(res.body.order_id).toEqual(1)
    expect(res.body.completed).toBeTrue()
  })
})

describe('dashBoard tests `/dashbaord`', () => {
  it('it tests last5 or recnt 5 orders', async () => {
    const res = await req
    .get('/dashbaord/last5')
    .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body[0].username).toEqual(`sysadmin`)
    expect(res.body[0].order_id).toEqual(1)
    expect(res.body[0].completed).toBeTrue
    expect(res.body[0].order_id).toEqual(1)
    expect(res.body[0].quantity).toEqual(1)
    expect(res.body[0].product_id).toEqual(1)
  });
  it('it tests top 5 products', async () => {
    const res = await req
      .get('/dashboard/top_products')
      .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body[0].product_id).toEqual(1)
    expect(res.body[0].product_name).toEqual(`Jasmine Testing Product`)
    expect(res.body[0].price).toEqual(50)
  })
})

//let's test cascade order delete
describe('Delete Order Route Test  `/order/delete/:id` ', () => {
  it('it tests Order delete method of Orders endpoint after login', async () => {
    const res = await req
      .delete('/order/delete/1')
      .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
  })
})

// le's make sure of the deleted order is really gone
describe('Orders Show Route Test  `/orders/:id` ', () => {
  it('it tests Show Order method of Orders endpoint after login', async () => {
    const res = await req
      .get('/orders/order/1')
      .set({ Authorization: `Bearer ` + jwt_token })
    expect(res.status).toBe(200)
    expect(res.body.order_id).toBeUndefined
    expect(res.body.completed).toBeUndefined()
  })
})

//Let's test product delete

describe('Products Delete Route Test  `/products/:id` [DELETE] ', () => {
  it('it tests product Delete method for Authenticated user', async () => {
    const res = await req
      .delete('/products/1')
      .set({ Authorization: `Bearer ` + jwt_token })
    //console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body.product_id).toBeNull
  })
})
