import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDashboardService, Product, Order } from '../services/user-dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
  quantityMap: Record<number, number> = {}; // quantity per product
  userId: number = 1; // replace with real logged-in user ID

  constructor(private service: UserDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.service.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.products.forEach(p => this.quantityMap[p.id] = 1);
      },
      error: (err: any) => console.error('Error loading products', err)
    });
  }

  loadOrders(): void {
    this.service.getUserOrders(this.userId).subscribe({
      next: (data: Order[]) => this.orders = data,
      error: (err: any) => console.error('Error loading orders', err)
    });
  }

  buyProduct(productId: number): void {
    const quantity = this.quantityMap[productId] || 1;
    const product = this.products.find(p => p.id === productId);
    if (!product || product.availableQty < quantity) {
      alert('Not enough stock!');
      return;
    }

    this.service.placeOrder(this.userId, productId, quantity).subscribe({
      next: (res: any) => {
        alert('Order placed successfully!');
        this.loadOrders();
        this.loadProducts(); // update stock
      },
      error: (err: any) => console.error('Error placing order', err)
    });
  }

  orderProductIds(order: Order): number[] {
    return Object.keys(order.productQuantityMap).map(id => Number(id));
  }

  productName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.prodName : 'Unknown';
  }

  logout(): void {
    // clear session/local storage if any
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']); // navigate to login page
  }
}