// import { Routes } from '@angular/router';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { ProductDetailComponent } from './components/product-detail/product-detail.component';
// import { ProductManagementComponent } from './components/admin/product-management/product-management.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'products', pathMatch: 'full' },
//   { path: 'products', component: ProductListComponent },
//   { path: 'products/:id', component: ProductDetailComponent },
//   { path: 'admin/products', component: ProductManagementComponent },
//   { path: '**', redirectTo: 'products' }
// ];


import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductManagementComponent } from './components/admin/products-management/product-management.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
import { OrdersManagementComponent } from './components/admin/orders-management/orders-management.component';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  // Admin Dashboard (top-level route)
  { path: 'admin', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },  // default tab
      { path: 'products', component: ProductManagementComponent },
      { path: 'orders', component: OrdersManagementComponent },
      { path: 'users', component: UsersManagementComponent },
    ]
  },
  
  { path: '**', redirectTo: 'products' }
];
