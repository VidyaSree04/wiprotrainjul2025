
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role-guard.guard';


import { AdminDashboardComponentProducts } from './admin-dashboard/products/admin-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard-main.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authGuard, roleGuard],
    data: { userType: 1 } // Normal users (userType: 1) can access this page
  },
  // {
  //   path: 'admin-dashboard',
  //   component: AdminDashboardComponentProducts,
  //   canActivate: [authGuard, roleGuard],
  //   data: { userType: 0 } // Admins (userType: 0) can access this page
  // },
  {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [authGuard, roleGuard],
  data: { userType: 0 } // Admins (userType: 0) can access this page
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { userType: 1 } // Normal users (userType: 1) can access this page
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];