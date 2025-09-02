// // import { Component, OnInit, Inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { AdminOrderService } from '../../services/admin-order.service';
// // import { Order } from '../../models/order';

// // @Component({
// //   selector: 'app-admin-dashboard-component-orders',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// // template: `
// //   <div style="border:1px solid blue; padding:5px;">
// //     <p>Orders component content</p>
// //   </div>
// // `
// // })
// // export class AdminDashboardComponentOrders implements OnInit {
// //   orders: Order[] = [];
// //   newOrder: Order = this.emptyOrder();
// //   constructor(@Inject(AdminOrderService) private productService: AdminOrderService) {}

// //   ngOnInit(): void {
// //     this.loadOrders();
// //   }

// //   loadOrders(): void {
// //     this.productService.getOrders().subscribe({
// //       next: (data: Order[]) => (this.orders = data),
// //       error: (err: any) => console.error('Error loading products:', err),
// //     });
// //   }

// //   private emptyOrder(): Order {
// //     return {
// //       id: '',
// //       userId: '',
// //       items: [],
// //       totalPrice: 0,
// //       status: 'None',
// //       orderDate: new Date().toISOString().split('T')[0],
// //     };
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface Order {
//   id: string;
//   userId: string;
//   status: string;
//   totalPrice: number;
//   orderDate: string;
// }

// @Component({
//   selector: 'app-admin-dashboard-component-orders',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div style="border: 1px solid #28a745; padding: 10px;">
//       <table>
//         <tr>
//           <th>ID</th>
//           <th>User ID</th>
//           <th>Status</th>
//           <th>Total</th>
//           <th>Date</th>
//         </tr>
//         <tr *ngFor="let o of orders">
//           <td>{{ o.id }}</td>
//           <td>{{ o.userId }}</td>
//           <td>{{ o.status }}</td>
//           <td>{{ o.totalPrice }}</td>
//           <td>{{ o.orderDate }}</td>
//         </tr>
//       </table>
//     </div>
//   `
// })
// export class AdminDashboardComponentOrders implements OnInit {
//   orders: Order[] = [];

//   ngOnInit(): void {
//     // Test data
//     this.orders = [
//       { id: 'O001', userId: 'U101', status: 'Pending', totalPrice: 1200, orderDate: '2025-09-01' },
//       { id: 'O002', userId: 'U102', status: 'Shipped', totalPrice: 80, orderDate: '2025-09-02' },
//       { id: 'O003', userId: 'U103', status: 'Delivered', totalPrice: 150, orderDate: '2025-09-03' },
//     ];
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminOrderService, OrderDisplay } from '../../services/admin-order.service';

@Component({
  selector: 'app-admin-dashboard-component-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponentOrders implements OnInit {
  orders: OrderDisplay[] = [];
  statuses = ['CREATED', 'PROCESSING', 'CANCELLED', 'DELIVERED'];
  loading = true;

  constructor(private orderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.loading = false;
      }
    });
  }

  updateStatus(order: OrderDisplay, event: any): void {
    const newStatus = event.target.value;
    this.orderService.updateOrderStatus(order.orderId, newStatus).subscribe({
      next: () => {
        order.status = newStatus;
      },
      error: (err) => console.error('Error updating status', err)
    });
  }
}