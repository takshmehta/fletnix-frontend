import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  if (state.url === '/login' && isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }

  if (!isLoggedIn && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};