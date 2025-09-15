import { Injectable } from '@angular/core';
import { API_BASE } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../models/order';
import { of } from 'rxjs/internal/observable/of';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 private base = API_BASE + '/orderms/order';
  constructor(private http: HttpClient, private auth: AuthService) {}

  // components call this to get current user's orders
  getMyOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.base}/myorders`);
}


  placeOrderFromCart(items: CartItem[]): Observable<Order[]> {
    const payload = {
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
    };
    return this.http.post<Order[]>(`${this.base}/place`, payload);
  }
  getAllOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.base}/admin/all`);
}

// admin: update status
updateStatus(orderId: number, status: string) {
  return this.http.put<Order>(`/api/orders/${orderId}/status`, { status });
}

cancelOrder(orderId: number) {
  return this.http.put<Order>(`/api/orders/${orderId}/cancel`, {});
}
updateOrderStatus(orderId: number, status: string) {
  // note: adapt this.base if your base is different; earlier you used API_BASE + '/orderms/order'
  return this.http.put<Order>(`${this.base}/${orderId}/status?status=${encodeURIComponent(status)}`, {});
}
}

