import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from '../products-management/product-management.component';
import { OrdersManagementComponent } from '../orders-management/orders-management.component';
import { UsersManagementComponent } from '../users-management/users-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ProductManagementComponent, OrdersManagementComponent, UsersManagementComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  activeTab: 'products' | 'orders' | 'users' = 'products';
}
