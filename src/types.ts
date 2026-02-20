export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promo_price: number | null;
  stock: number;
  image_url: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
