type order = {
  order_id?: number
  order_timestamp?: string
  user_id: number // user who comitted the order
  completed?: boolean // Order Status flag true means done false means not doneor not completed
}

export default order
