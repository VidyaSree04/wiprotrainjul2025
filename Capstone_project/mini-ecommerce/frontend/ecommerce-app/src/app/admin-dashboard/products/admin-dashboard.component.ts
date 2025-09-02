import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductService, Product } from '../../services/admin-product.service';

@Component({
  selector: 'app-admin-dashboard-component-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponentProducts implements OnInit {
  products: Product[] = [];
  newProduct: Product = this.emptyProduct();
  editingProduct: Product | null = null;

  constructor(private productService: AdminProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products', err)
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = this.emptyProduct();
      },
      error: (err) => console.error('Error adding product', err)
    });
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (!this.editingProduct) return;
    this.productService.updateProduct(this.editingProduct.id!, this.editingProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProduct = null;
      },
      error: (err) => console.error('Error updating product', err)
    });
  }

  deleteProduct(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product', err)
    });
  }

  private emptyProduct(): Product {
    return {
      id: undefined,
      prodName: '',
      prodDesc: '',
      prodCat: '',
      make: '',
      availableQty: 0,
      price: 0,
      uom: '',
      prodRating: 0,
      imageURL: '',
      dateOfManufacture: new Date().toISOString().split('T')[0]
    };
  }
}