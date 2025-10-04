export interface Order {
  id?: number;
  user_id: number;
  total_price: number;
  status: string;
  created_at?: Date;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}
