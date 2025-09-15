import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
form = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.form).subscribe({
      next: res => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert('Registration failed: ' + (err.error?.message || err.statusText));
      }
    });
  }
}
