import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  id?: number;
  prodName: string;
  prodDesc: string;
  prodCat: string;
  make: string;
  availableQty: number;
  price: number;
  uom: string;
  prodRating: number;
  imageURL: string;
  dateOfManufacture: string; // or Date if you want to parse
}

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  // The base URL for the backend server
  private baseUrl = 'http://localhost:8082';
  // The specific API endpoint for product operations
  private apiUrl = `${this.baseUrl}/product`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // updateProduct(id: number, product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  // }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
