import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services";

export const permissionGuard = (requiredPermissions: string[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUserValue;

    if (!user) {
      router.navigate(['/auth/login']);
      return false;
    }

    const hasPermission = requiredPermissions.some(permission =>
      user.permissions?.includes(permission)
    );

    if (hasPermission) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};