import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
const auth = inject(AuthService);
  const router = inject(Router);
  const expected: string[] = route.data?.['roles'] || [];
  if(expected.length === 0) return true;
  if(expected.some(r => auth.hasRole(r))) return true;
  router.navigate(['/']); return false;
};
