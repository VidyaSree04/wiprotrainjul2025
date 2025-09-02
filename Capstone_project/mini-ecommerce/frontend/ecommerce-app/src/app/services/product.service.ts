import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8082/product';

  constructor(private http: HttpClient) {}

  // Use this mock method for testing purposes.
  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      {
        id: 1, prodName: 'Vintage Vinyl Player', prodDesc: 'Classic record player with modern Bluetooth connectivity.', prodCat: 'Electronics', make: 'Audiophile Co.', availableQty: 15, price: 129.99, uom: 'unit', prodRating: 4.8, imageURL: 'https://placehold.co/300x200/FF5733/ffffff?text=Product+1', dateOfManufacture: '2023-01-15'
      },
      {
        id: 2, prodName: 'Ceramic Coffee Mug', prodDesc: 'Hand-crafted mug for your morning brew. Microwave safe.', prodCat: 'Home Goods', make: 'Pottery Studio', availableQty: 50, price: 12.50, uom: 'unit', prodRating: 4.5, imageURL: 'https://placehold.co/300x200/C70039/ffffff?text=Product+2', dateOfManufacture: '2022-10-20'
      },
      {
        id: 3, prodName: 'Running Shoes', prodDesc: 'Lightweight and breathable shoes for daily runs.', prodCat: 'Apparel', make: 'RunFast Inc.', availableQty: 30, price: 89.99, uom: 'pair', prodRating: 4.9, imageURL: 'https://placehold.co/300x200/900C3F/ffffff?text=Product+3', dateOfManufacture: '2023-04-01'
      },
      {
        id: 4, prodName: 'Portable Charger', prodDesc: '10000mAh power bank, charges your phone multiple times.', prodCat: 'Electronics', make: 'PowerUp', availableQty: 100, price: 25.00, uom: 'unit', prodRating: 4.7, imageURL: 'https://placehold.co/300x200/581845/ffffff?text=Product+4', dateOfManufacture: '2023-02-10'
      }
    ];
    return of(products);
  }
}
