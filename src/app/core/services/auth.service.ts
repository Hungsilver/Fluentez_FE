import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(
private apiService: ApiService,      // ← Data access dependency
    private tokenService: TokenService,
    private router: Router

  ) {
    this.loadCurrentUser();
   }

   // ✅ Business logic: Login flow
  login(credentials: any): Observable<any> {
    return this.apiService.post<any>('/auth/login', credentials)
      .pipe(
        tap((response:any) => {
          // Save tokens
          this.tokenService.setTokens(response.accessToken, response.refreshToken);
          
          // Decode and set current user
          const user = this.tokenService.decodeToken(response.accessToken);
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  // ✅ Business logic: Logout flow
  logout(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    
    this.apiService.post('/auth/logout', { refreshToken }).subscribe({
      complete: () => {
        this.tokenService.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  // ✅ Business logic: Check permissions
  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) ?? false;
  }

  // ✅ Business logic: Check roles
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) ?? false;
  }

  private loadCurrentUser(): void {
    const token = this.tokenService.getAccessToken();
    if (token) {
      const user = this.tokenService.decodeToken(token);
      this.currentUserSubject.next(user);
    }
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.apiService.post<any>('/auth/refresh-token', { refreshToken });
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
