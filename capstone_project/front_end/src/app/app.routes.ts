import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { AdminProductComponent } from './components/products/admin-product/admin-product.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { ProductSearchComponent } from './components/products/product-search/product-search.component';
import { AdminOrdersComponent } from './components/orders/admin-orders/admin-orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'admin/products', component: AdminProductComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'admin/orders', component: AdminOrdersComponent},
  { path: 'search', component: ProductSearchComponent },

  { path: '**', redirectTo: '' }
];
