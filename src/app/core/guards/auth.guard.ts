import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    // Sử dụng tap để thực hiện side effect (điều hướng) dựa trên kết quả
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        // Redirect to login nếu không được xác thực
        router.navigate(['']); 
      }
    })
  );
};