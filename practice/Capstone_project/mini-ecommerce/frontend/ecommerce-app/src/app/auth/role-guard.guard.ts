// src/app/auth/role.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the expected userType from the route's data
  const expectedUserType = route.data['userType'];
  const currentUser = authService.getCurrentUser();

  if (currentUser && currentUser.userType === expectedUserType) {
    return true; // User has the correct role
  } else {
    // Redirect to a different page (e.g., login or an access denied page)
    return router.createUrlTree(['/login']); 
  }
};