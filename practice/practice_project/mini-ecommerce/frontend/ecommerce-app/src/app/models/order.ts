export interface Order {
  id: string;
  userId: string;
  items: Array<{ productId: string; productName: string; quantity: number; price: number; }>;
  totalPrice: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'|'None';
  orderDate: string;
}