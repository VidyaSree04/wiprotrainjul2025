import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
// product-list.component.ts (excerpt)
categories = [
  { name: 'Electronics', img: 'https://i.postimg.cc/qRrFChbc/eclogo.jpg' },
  { name: 'Fashion',     img: 'https://i.postimg.cc/BQJqGtJK/cloth.jpg' },
  { name: 'Books',       img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVg-vb5J-rRNutFR6HOMQ3tK75N6xjj1PRA&s' },
  { name: 'Footwear',     img: 'https://i.postimg.cc/qv06Sp5b/footwear.png' }
 
];


  products: any[] = [];
  category: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('category');
      this.category = cat;
      if (cat) {
        this.loadProductsForCategory(cat);
      } else {
        // show categories grid (products list emptied)
        this.products = [];
      }
    });
  }

  loadProductsForCategory(cat: string) {
  this.loading = true;
  this.error = null;

  this.productService.getAll().subscribe({
    next: (res: any[]) => {
      if (!res || res.length === 0) {
        this.products = [];
      } else {
        // ✅ Ensure we filter products by category (case-insensitive)
        this.products = res.filter(p =>
  (p.category || '').trim().toLowerCase() === cat.trim().toLowerCase()
);
      }
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load products.';
      this.loading = false;
    }
  });
}


  backToCategories() {
  this.router.navigate(['/products']);
}

  addToCart(p: any) {
    if (p.quantity !== undefined && p.stock <= 0) {
      alert('Out of stock');
      return;
    }
    this.cartService.add(p, 1);
    alert('Added to cart');
  }

}
