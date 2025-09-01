export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total_amount: number;
  delivery_address: string;
  tracking_number: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  personalization_details: object | null;
}
