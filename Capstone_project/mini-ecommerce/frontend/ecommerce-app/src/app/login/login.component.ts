// // // src/app/login/login.component.ts

// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // import { Router, RouterModule } from '@angular/router';
// // import { AuthService } from '../auth/auth.service';
// // import { catchError, of } from 'rxjs';

// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule, RouterModule],
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css'],
// // })
// // export class LoginComponent implements OnInit {
// //   loginForm!: FormGroup;
// //   errorMessage: string | null = null;
// //   loading = false;

// //   constructor(
// //     private fb: FormBuilder,
// //     private authService: AuthService,
// //     private router: Router
// //   ) {}

// //   ngOnInit(): void {
// //     this.loginForm = this.fb.group({
// //       userId: ['', [Validators.required]],
// //       password: ['', [Validators.required]],
// //     });
// //   }

// //   onSubmit(): void {
// //     this.errorMessage = null;
// //     this.loading = true;

// //     if (this.loginForm.valid) {
// //       const { userId, password } = this.loginForm.value;

// //       this.authService.login(userId, password).pipe(
// //         catchError(error => {
// //           this.loading = false;
// //           if (error.status === 401) {
// //             this.errorMessage = 'Invalid user ID or password.';
// //           } else {
// //             this.errorMessage = 'An unexpected error occurred. Please try again.';
// //           }
// //           return of(null);
// //         })
// //       ).subscribe(user => {
// //         this.loading = false;
// //         if (user) {
// //           console.log('Login successful:', user);
// //           // Redirect based on userType
// //           if (user.userType === 0) {
// //             this.router.navigate(['/admin']);
// //           } else if (user.userType === 1) {
// //             this.router.navigate(['/home']);
// //           } else {
// //             // Handle other user types or default to a safe page
// //             this.router.navigate(['/']);
// //           }
// //         }
// //       });
// //     } else {
// //       this.loading = false;
// //       this.errorMessage = 'Please fill out all required fields.';
// //     }
// //   }

// //   get f() {
// //     return this.loginForm.controls;
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
// import { catchError, of } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   errorMessage: string | null = null;
//   loading = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       userId: ['', [Validators.required]],
//       password: ['', [Validators.required]],
//     });
//   }

//   onSubmit(): void {
//     this.errorMessage = null;
//     this.loading = true;
//     if (this.loginForm.valid) {
//       const { userId, password } = this.loginForm.value;
//       this.authService.login(userId, password).pipe(
//         catchError(error => {
//           this.loading = false;
//           if (error.status === 401) {
//             this.errorMessage = 'Invalid user ID or password.';
//           } else {
//             this.errorMessage = 'An unexpected error occurred. Please try again.';
//           }
//           return of(null);
//         })
//       ).subscribe(user => {
//         this.loading = false;
//         if (user) {
//           // Conditional redirection based on user type
//           if (user.userType === 0) {
//             this.router.navigate(['/admin-dashboard']);
//           } else if (user.userType === 1) {
//             this.router.navigate(['/products']);
//           } else {
//             this.router.navigate(['/']);
//           }
//         }
//       });
//     } else {
//       this.loading = false;
//       this.errorMessage = 'Please fill out all required fields.';
//     }
//   }

//   get f() {
//     return this.loginForm.controls;
//   }
// }

// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.loading = true;

    if (this.loginForm.valid) {
      const { userId, password } = this.loginForm.value;

      this.authService.login(userId, password).pipe(
        catchError(error => {
          this.loading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid user ID or password.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
          return of(null);
        })
      ).subscribe((user: User | null) => {
        this.loading = false;
        if (user) {
          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect based on userType
          if (user.userType === 0) {
            this.router.navigate(['/admin-dashboard']);
          } else if (user.userType === 1) {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}