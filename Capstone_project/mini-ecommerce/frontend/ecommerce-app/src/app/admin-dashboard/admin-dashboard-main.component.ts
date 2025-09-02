import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponentProducts } from './products/admin-dashboard.component';
import { AdminDashboardComponentOrders } from './orders/admin-dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AdminDashboardComponentProducts,
    AdminDashboardComponentOrders
  ],
  templateUrl: './admin-dashboard-main.component.html',
  styleUrls: ['./admin-dashboard-main.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeTab = signal<string>('products'); // default tab

  ngOnInit(): void {}

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}