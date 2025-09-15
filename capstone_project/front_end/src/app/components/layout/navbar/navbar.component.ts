import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
searchTerm: string = '';
  cartCount: number = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // 🔹 Subscribe to cart count observable
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  onSearch(searchInput: string) {
    if (!searchInput.trim()) return;
    this.router.navigate(['/search'], { queryParams: { keyword: searchInput } });
  }
}
