import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  userId = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (!form.valid) return;

    this.authService.login(this.userId, this.password).subscribe({
      next: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));

        if (user.userType === 0) {
          // Admin
          this.router.navigate(['/admin']);
        } else {
          // Normal user
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid credentials!';
      }
    });
  }
}