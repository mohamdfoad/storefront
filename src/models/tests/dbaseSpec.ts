import User from '../../types/user-type'
import userStore from '../../models/users_model'
import Order from '../../types/order-type'
import OrderStore from '../../models/orders_model'
import Product from '../../types/product-type'
import productStore from '../../models/products_model'
import dashboardStore from '../../services/dashboard_service'
// import config from '../../config/envconfig'
// import bcrypt from 'bcrypt'

const uStore = new userStore()
const u: User = {
  username: 'testUser1',
  password: 'H0loLense90',
  first_name: 'test User fname',
  last_name: 'test user lname',
}
const u_db: User = { ...u, user_id: 1 }
// const pepper = config.BCRYPT_PASSWORD
// const saltRounds = config.SALT_ROUNDS
// const hash_digest = bcrypt.hashSync(
//   u.password + pepper,
//   parseInt(saltRounds as string)
// )

describe('Users_model tests', () => {
  it('Checks if user model has register metohd (Create)', () => {
    expect(uStore.register).toBeDefined
  })
  it('Checks if model has authenticate metohd (Showwith password compare)', () => {
    expect(uStore.authenticate).toBeDefined
  })

  it('registers a new user', async () => {
    const result = await uStore.register(u)
    expect(result.first_name).toEqual(u_db.first_name)
    expect(result.last_name).toEqual(u_db.last_name)
    expect(result.username).toEqual(u_db.username)
    expect(result.user_id).toEqual(u_db.user_id)
  })

  it('Testing Authentication method of Ustore', async () => {
    const result = (await uStore.authenticate(u.username, u.password)) as User
    expect(result.first_name).toEqual(u_db.first_name)
    expect(result.last_name).toEqual(u_db.last_name)
    expect(result.username).toEqual(u_db.username)
   
  })

  it('Lists or Index() users', async () => {
    const result = await uStore.index()
    console.log(result[0])
    expect(result[0].first_name).toEqual(u_db.first_name)
    expect(result[0].last_name).toEqual(u_db.last_name)
    expect(result[0].username).toEqual(u_db.username)
  })


it('tests show() user', async () => {
  const result = await uStore.show(u.username)
  console.log(result)
  expect(result.first_name).toEqual(u_db.first_name)
  expect(result.last_name).toEqual(u_db.last_name)
  expect(result.username).toEqual(u_db.username)
})
}); // end of suite

const pStore = new productStore()
const p: Product = {
  product_name: 'Test Product Name',
  price: 25,
}

const p_db: Product = { ...p, product_id: 1 }

describe('product_model tests', () => {
  it('Checks if product model has index metohd', () => {
    expect(pStore.index).toBeDefined
  })
  it('Checks product model has a show method', () => {
    expect(pStore.show).toBeDefined
  })
  it('Checks product model has a create method', () => {
    expect(pStore.create).toBeDefined
  })

  it('creates a new product in table products_table', async () => {
    const result = (await pStore.create(p)) as Product
    expect(result).toEqual(p_db)
  })

  it('checks index method to return list of products', async () => {
    const result = await pStore.index()
    expect(result[0]).toEqual(p_db)
  })

  it('checks show method to return certain product', async () => {
    const result = await pStore.show(1)
    expect(result).toEqual(p_db)
  })

  it('checks show method to return null for unfound product', async () => {
    const result = await pStore.show(100)
    expect(result).toBeNull
  })
})

const oStore = new OrderStore()
const o: Order = {
  user_id: 1,
}

const o_db: Order = { ...o, order_id: 1, completed: false }

describe('order_model tests', () => {
  it('Checks if order model has index metohd', () => {
    expect(oStore.index).toBeDefined
  })
  it('Checks order model has a show method', () => {
    expect(oStore.show).toBeDefined
  })
  it('Checks product model has a create method', () => {
    expect(oStore.create).toBeDefined
  })

  it('creates a new order in table orders_table', async () => {
    const result = (await oStore.create(o)) as Order
    expect(result.order_timestamp).toBeDefined
    expect(result.order_id).toEqual(1)
    expect(result.completed).toBeFalse
  })

  it('checks index method to return list of orders', async () => {
    const result = await oStore.index()
    expect(result[0].order_id).toEqual(o_db.order_id)
  })

  it('checks show method to return certain order', async () => {
    const result = await oStore.show(1)
    expect(result.order_timestamp).toBeDefined
    expect(result.order_id).toEqual(1)
    expect(result.completed).toBeFalse
  })

  it('Sets certain order status (completed) to true', async () => {
    const result = await oStore.setOrderStatus('1', true)
    expect(result.completed).toBeTrue
  })
  it('adds a certain product to a certain order details', async () => {
    const result = await oStore.addProduct(2, '1', '1') // quantity,orderid, productid surely created above
   
    expect(result.order_id_fk).toEqual(1)
    expect(result.product_id_fk).toEqual(1)
    expect(result.quantity).toEqual(2)
  })

  //dashboard tests
  const dashStor = new dashboardStore()
  it('checks dashBoard index method to return list of usersorders', async () => {
    const result = await dashStor.index()
    expect(result[0].order_id).toEqual(1)
    expect(result[0].user_id).toEqual(1)
    expect(result[0].quantity).toEqual(2)
    expect(result[0].product_name).toEqual(`Test Product Name`)
  })

  it('checks dashBoard topProductsPurchases method', async () => {
    const result = await dashStor.topProductsPurchases()
    expect(result[0].price).toEqual(25)
    expect(result[0].product_name).toEqual(`Test Product Name`)
  })

  it('deletes order cascading details', async () => {
    const del_result = await oStore.delete('1')
    expect(del_result).toBeUndefined
    const result = await oStore.show(1)
    expect(result).toBeNull
  })

  it('deletes product cascading data of certain product', async () => {
    const del_result = await pStore.delete('1')
    expect(del_result).toBeUndefined
    const result = await pStore.show(1)
    expect(result).toBeNull
  })
})
