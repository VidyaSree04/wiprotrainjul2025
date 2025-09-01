import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductService, Product } from '@app/services/admin-product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = this.emptyProduct();
  editingProduct: Product | null = null;

  constructor(@Inject(AdminProductService) private productService: AdminProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => this.products = data,
      error: (err: any) => console.error('Error loading products:', err)
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (data: Product) => {
        this.loadProducts();
        this.newProduct = this.emptyProduct();
      },
      error: (err: any) => console.error('Error adding product:', err)
    });
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (!this.editingProduct?.id) return;
    this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: (data: Product) => {
        this.loadProducts();
        this.editingProduct = null;
      },
      error: (err: any) => console.error('Error updating product:', err)
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err: any) => console.error('Error deleting product:', err)
    });
  }

  private emptyProduct(): Product {
    return {
      prodName: '',
      prodDesc: '',
      prodCat: '',
      make: '',
      availableQty: 0,
      price: 0,
      uom: 'Rs',
      prodRating: 0,
      imageURL: '',
      dateOfManufacture: new Date().toISOString().split('T')[0]
    };
  }
}
