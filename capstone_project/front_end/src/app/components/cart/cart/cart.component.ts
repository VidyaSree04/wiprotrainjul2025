import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: any[] = [];

  constructor(private cart: CartService, private router: Router, private orders: OrderService) {}

  ngOnInit(): void {
    this.items = this.cart.get();
  }

  increase(item: any) {
    this.cart.add({ id: item.productId, name: item.productName, price: item.price }, 1);
    this.items = this.cart.get();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      this.cart.add({ id: item.productId, name: item.productName, price: item.price }, -1);
    } else {
      this.remove(item.id);
    }
    this.items = this.cart.get();
  }

  remove(id: number) {
    this.cart.remove(id);
    this.items = this.cart.get();
  }

  getTotalItems() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  checkout() {
    if (!confirm('Place the order?')) return;

    this.orders.placeOrderFromCart(this.items).subscribe({
      next: () => {
        this.cart.clear();
        this.router.navigate(['/orders']);
      },
      error: err => alert('Order failed: ' + (err?.error?.message || err.message))
    });
  }
}
