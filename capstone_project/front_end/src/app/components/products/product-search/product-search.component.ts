import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  // imports: [CommonModule,RouterLink],
    imports: [CommonModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
products: Product[] = [];
  keyword: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      if (this.keyword) {
        this.productService.searchProducts(this.keyword).subscribe(data => {
          this.products = data;
        });
      }
    });
  }
}
