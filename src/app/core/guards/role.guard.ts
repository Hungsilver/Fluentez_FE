import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services";

export const roleGuard = (allowedRoles: string[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUserValue;

    if (!user) {
      router.navigate(['']);
      return false;
    }

    const hasRole = user.roles?.some((role:any) => allowedRoles.includes(role));

    if (hasRole) {
      return true;
    }

    // Redirect to unauthorized page
    router.navigate(['/unauthorized']);
    return false;
  };
};
