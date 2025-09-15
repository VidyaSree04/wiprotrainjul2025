import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartItems = [
    { name: 'Laptop', price: 55000, qty: 1 },
    { name: 'Headphones', price: 2000, qty: 2 }
  ];

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}
