import { Injectable } from '@angular/core';
import { API_BASE } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private base = API_BASE + '/product';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.base}`);
}

getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${productId}`);
  }

 searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/search?keyword=${query}`);
  }
getAll(category?: string): Observable<Product[]> {
  if (category) {
    return this.http.get<Product[]>(`${this.base}?category=${category}`);
  }
  return this.http.get<Product[]>(this.base);
}
  create(p: Product){ return this.http.post<Product>(this.base, p); }
  update(p: Product){ return this.http.put<Product>(this.base, p); }
  delete(id: number){ return this.http.delete(`${this.base}?id=${id}`, { responseType: 'text' }); }
}
