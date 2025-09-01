import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-management.html',
  styleUrls: ['./orders-management.css']
})
export class OrdersManagementComponent {
  // Add dummy data if needed
  orders = [
    { id: 101, customer: 'John Doe', total: 1200, status: 'Pending' },
    { id: 102, customer: 'Jane Smith', total: 850, status: 'Delivered' },
    { id: 103, customer: 'Mike Johnson', total: 450, status: 'Cancelled' }
  ];
}
