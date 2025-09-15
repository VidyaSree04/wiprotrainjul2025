export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  category?: string;
  brand?: string;
  manufacturingDate?: string; // ISO date string
}
