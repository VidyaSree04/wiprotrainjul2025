export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  status: string;
   productImage?: string;
  productName?: string;
}
