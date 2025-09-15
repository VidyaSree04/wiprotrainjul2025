import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Add FormsModule here
  templateUrl: './orders-management.html',
  styleUrls: ['./orders-management.css']
})
export class OrdersManagementComponent implements OnInit {
  orders: Order[] = [];
  statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error(err)
    });
  }

  updateStatus(order: Order, newStatus: string) {
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (res) => {
        order.status = res.status;
      },
      error: (err) => console.error(err)
    });
  }

  cancelOrder(order: Order) {
    this.orderService.cancelOrder(order.id).subscribe({
      next: (res) => {
        order.status = res.status;
      },
      error: (err) => console.error(err)
    });
  }
}