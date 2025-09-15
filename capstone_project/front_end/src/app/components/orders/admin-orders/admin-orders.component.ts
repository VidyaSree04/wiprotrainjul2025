import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  statuses = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: data => { this.orders = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  changeStatus(order: Order, status: string) {
  this.orderService.updateStatus(order.id, status).subscribe({
    next: updated => order.status = updated.status,
    error: err => console.error(err)
  });
}

}
