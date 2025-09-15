import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  prodName: string;
  prodDesc: string;
  prodCat: string;
  price: number;
  uom: string;
  availableQty: number;
  imageURL: string;
}

export interface Order {
  orderId: number;
  userId: number;
  productQuantityMap: Record<number, number>;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
  private productsUrl = 'http://localhost:8082/product';
  private ordersUrl = 'http://localhost:8083/order';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.ordersUrl}?userId=${userId}`);
  }

  placeOrder(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.ordersUrl}`, { userId, productQuantityMap: { [productId]: quantity } });
  }
}