export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number | null;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}
