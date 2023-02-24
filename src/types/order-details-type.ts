type order_detail = {
  detail_id?: number
  order_id_fk: number // order's id FK (foriegn key).
  product_id_fk: number // product's id (foriegn key).
  quantity: number // product's quantity within the order.
}

export default order_detail
