// import { Routes } from '@angular/router';
// import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
// import { UserDashboardComponent } from './components//user-dashboard/user-dashboard.component';
// import { LoginComponent } from './components/auth/login/login';
// import { AuthGuard } from './guards/auth-guard';
// import { AdminGuard } from './guards/admin-guard';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'admin', component: AdminDashboardComponent},
//   { path: 'user', component: UserDashboardComponent},
//   { path: '**', redirectTo: 'login' }
// ];

// import { Routes } from '@angular/router';
// import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
// import { AuthGuard } from './guards/auth-guard';
// import { AdminGuard } from './guards/admin-guard';
// import { LoginComponent } from './components/auth/login/login';

// export const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
//   // other routes...
// ];

import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
import { ProductManagementComponent } from './components/admin/products-management/product-management.component';
import { OrdersManagementComponent } from './components/admin/orders-management/orders-management.component';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';
import { LoginComponent } from './components/auth/login/login';

export const routes: Routes = [
  // Normal user home → Product List
  { path: '', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  // Admin Dashboard
  { path: 'admin', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductManagementComponent },
      { path: 'orders', component: OrdersManagementComponent },
      { path: 'users', component: UsersManagementComponent },
    ]
  },

  // Auth
  { path: 'login', component: LoginComponent },

  // Fallback route
  { path: '**', redirectTo: '' }
];