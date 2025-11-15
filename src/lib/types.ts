export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  description: string
}

export interface Order {
  id: number
  customer_name: string
  customer_phone: string
  customer_address: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed'
  created_at: string
}
