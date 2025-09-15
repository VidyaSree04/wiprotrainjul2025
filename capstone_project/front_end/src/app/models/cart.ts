export interface CartItem {
  id?: number;
  productId: number;
  productName?: string;
  price?: number;
  quantity: number;
  userId?: number;
  imageUrl?: string
}
