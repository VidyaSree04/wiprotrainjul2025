import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  emailId = '';
  password = '';
  address = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    if (!form.valid) return;

    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      password: this.password,
      address: this.address,
      userType: 1 // always normal user
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'Registration failed! Please try again.';
        this.successMessage = '';
      }
    });
  }
}