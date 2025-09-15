import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { ProductService } from '../../../services/product.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
 orders: Order[] = [];
  loading = false;
  error: string | null = null;
  placeholderImage = 'assets/no-image.png'; // add a local fallback image in assets

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = null;

    this.orderService.getMyOrders().subscribe({
      next: orders => {
        this.orders = orders || [];
        // after we have orders, fetch product details for unique productIds
        this.loadProductDetailsForOrders();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load your orders.';
        this.loading = false;
      }
    });
  }

  private loadProductDetailsForOrders() {
    // collect unique product IDs
    const ids = Array.from(new Set(this.orders.map(o => o.productId).filter(Boolean)));

    if (!ids.length) return;

    // create observables for each id
    const calls = ids.map(id =>
      this.productService.getProductById(id).pipe(
        // if any product fetch fails, return null instead of failing the whole forkJoin
        catchError(err => {
          console.warn('Product fetch failed for id', id, err);
          return of(null);
        })
      )
    );

    forkJoin(calls).subscribe(results => {
      const map = new Map<number, any>();
      results.forEach((prod, idx) => {
        const id = ids[idx];
        if (prod) map.set(id, prod);
      });

      // attach product details to each order
      this.orders.forEach(o => {
        const p = map.get(o.productId);
        if (p) {
          // try several common fields for image / name
          o.productImage = p.image || p.imageUrl || p.img || p.thumbnail || p.picture || null;
          o.productName = p.name || p.title || p.productName || '';
        } else {
          o.productImage = this.placeholderImage;
          o.productName = '';
        }
      });
    });
  }

  cancelOrder(order: Order) {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderService.updateOrderStatus(order.id, 'CANCELLED').subscribe({
      next: updated => {
        // backend should return updated order object (or at least status)
        if (updated && (updated as any).status) {
          order.status = (updated as any).status;
        } else {
          order.status = 'CANCELLED'; // fallback
        }
      },
      error: err => {
        console.error('Cancel order failed', err);
        alert('Failed to cancel order. Try again.');
      }
    });
  }
}

