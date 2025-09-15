import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {
 products: any[] = [];

  // add form model
  newProduct: any = {
    name: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    category: '',
    description: '',
    brand: '',
    manufacturingDate: ''
  };

  // controls
  addFormVisible: boolean = false;
  editProduct: any = null; // product being edited

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.getAll().subscribe(res => (this.products = res || []));
  }

  // ---- Add form controls ----
  showAddForm() {
    this.editProduct = null;
    this.addFormVisible = true;
  }

  hideAddForm() {
    this.addFormVisible = false;
    this.resetNewProduct();
  }

  resetNewProduct() {
    this.newProduct = {
      name: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      category: '',
      description: '',
      brand: '',
      manufacturingDate: ''
    };
  }

  addSubmit() {
    // validate minimal required fields
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Please provide a valid name and price.');
      return;
    }

    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.resetNewProduct();
        this.addFormVisible = false;
        this.load();
      },
      error: (err) => {
        console.error('Create product failed', err);
        alert('Failed to add product. Check console.');
      }
    });
  }

  // ---- Edit flow ----
  startEdit(p: any) {
    this.editProduct = { ...p }; // clone
    this.addFormVisible = false;
  }

  saveEdit() {
    if (!this.editProduct) return;
    this.productService.update(this.editProduct).subscribe({
      next: () => {
        this.editProduct = null;
        this.load();
      },
      error: (err) => {
        console.error('Update product failed', err);
        alert('Failed to update product. Check console.');
      }
    });
  }

  cancelEdit() {
    this.editProduct = null;
  }

  // ---- Delete ----
  delete(id: number) {
    if (!confirm('Delete product?')) return;
    this.productService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete product.');
      }
    });
  }
}
