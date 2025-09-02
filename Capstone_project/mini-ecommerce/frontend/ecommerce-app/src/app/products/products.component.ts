import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  loading = new BehaviorSubject<boolean>(true);
  error = new BehaviorSubject<boolean>(false);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading.next(true);
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products$ = of(data);
        this.loading.next(false);
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
        this.loading.next(false);
        this.error.next(true);
      }
    });
  }
}
