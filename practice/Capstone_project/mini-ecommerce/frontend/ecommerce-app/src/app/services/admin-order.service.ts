import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Order {
  orderId: number;
  userId: number;
  productQuantityMap: Record<number, number>;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
}

export interface Product {
  id: number;
  prodName: string;
  prodCat: string;
}

export interface OrderDisplay {
  orderId: number;
  userId: number;
  productName: string;
  productCategory: string;
  quantity: number;
  totalAmount: number;
  status: string;
  orderDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private baseUrlOrders = 'http://localhost:8083/order';
  private baseUrlProducts = 'http://localhost:8082/product';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderDisplay[]> {
    return this.http.get<Order[]>(this.baseUrlOrders).pipe(
      switchMap((orders) => {
        const observables = orders.map(order => {
          const productIds = Object.keys(order.productQuantityMap).map(id => Number(id));
          const productObservables = productIds.map(id => 
            this.http.get<Product>(`${this.baseUrlProducts}/${id}`)
          );

          return forkJoin(productObservables).pipe(
            map(products => {
              return products.map(product => ({
                orderId: order.orderId,
                userId: order.userId,
                productName: product.prodName,
                productCategory: product.prodCat,
                quantity: order.productQuantityMap[product.id],
                totalAmount: order.totalAmount,
                status: order.orderStatus,
                orderDate: order.orderDate
              }));
            })
          );
        });

        return forkJoin(observables).pipe(
          map(arrays => arrays.flat()) // flatten array of arrays
        );
      })
    );
  }

  // updateOrderStatus(orderId: number, status: string) {
  //   return this.http.put(`${this.baseUrlOrders}/${orderId}/status`, { orderStatus: status });
  // }
  updateOrderStatus(orderId: number, status: string) {
  const url = `${this.baseUrlOrders}/${orderId}/status?status=${status}`;
  return this.http.put(url, {}); // empty body
}
}