import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Add 'userId' to the form group
    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.loading = true;

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).pipe(
        catchError(error => {
          this.loading = false;
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
          return of(null);
        })
      ).subscribe(user => {
        this.loading = false;
        if (user) {
          console.log('Registration successful:', user);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'Please complete all required fields.';
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}