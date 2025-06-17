import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.role$.pipe(
    take(1),
    map(role => {
      if (role === 'Admin') {
        return true;
      } else {
        router.navigate(['/']); 
        return false;
      }
    })
  );
};
