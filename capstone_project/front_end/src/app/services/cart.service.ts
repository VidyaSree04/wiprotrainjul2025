import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart';
import { API_BASE } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private STORAGE_KEY = 'app_cart';
  private base = API_BASE + '/orderms/order';

  constructor(private http: HttpClient, private auth: AuthService) {}

 private cartCountSubject = new BehaviorSubject<number>(this.getTotalItems());
  cartCount$ = this.cartCountSubject.asObservable();



  // local storage helpers used by UI
  get(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]') as CartItem[];
    } catch {
      return [];
    }
  }

  add(product: any, qty = 1): void {
    const items = this.get();
    const pid = product.id ?? product.productId;
    const found = items.find(i => i.productId === pid);

    if (found) {
      found.quantity = (found.quantity || 0) + qty;
    } else {
      const item: CartItem = {
        id: Date.now(),
        productId: pid,
        productName: product.name || product.productName,
        price: product.price || 0,
        quantity: qty,
        userId: this.auth.getUserId() ?? undefined,
        imageUrl: product.imageUrl || ''
      };
      items.push(item);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateCartCount();
  }

  remove(id: number): void {
    const items = this.get().filter(i => i.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateCartCount();
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCartCount();
  }

  private updateCartCount() {
    this.cartCountSubject.next(this.getTotalItems());
  }

  getTotalItems(): number {
    return this.get().reduce((sum, i) => sum + (i.quantity || 0), 0);
  }

  placeOrder(uid: number, items: CartItem[]) {
    return this.http.post(`${this.base}/place`, { userId: uid, items });
  }

  // optional server sync endpoints
  getCart(uid: number): Observable<CartItem[]> {
    if (!uid) return of([]);
    return this.http.get<CartItem[]>(`${this.base}/cart/${uid}`);
  }

  addServer(uid: number, productId: number, qty: number) {
    return this.http.post(`${this.base}/cart/addProd`, { userId: uid, productId, qty }, { responseType: 'text' });
  }

  updateServer(uid: number, productId: number, qty: number) {
    return this.http.put(`${this.base}/cart/update`, { userId: uid, productId, qty }, { responseType: 'text' });
  }

  deleteServer(itemId: number) {
    return this.http.delete(`${this.base}/cart/deleteProd/${itemId}`, { responseType: 'text' });
  }}
