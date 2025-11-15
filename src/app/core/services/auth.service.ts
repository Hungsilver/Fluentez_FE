import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IApiResponse } from '@core/models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router,
    private storageService: StorageService,
    private noti: NzNotificationService
  ) {
    this.loadCurrentUser();
  }

  // ✅ Login
  login(body: any): Observable<IApiResponse<any>> {
    return this.apiService.post<any>('/auth/login', body).pipe(
      tap((res) => {
        if (res.data && res.isSuccess && res.data) {
          const { accessToken, refreshToken, expirationDate } = res.data;
          this.tokenService.setTokens(
            accessToken,
            refreshToken,
            expirationDate
          );
        }
      }),
      catchError((error) => {
        console.error('Đăng nhập không thành công:', error);
        return throwError(() => error);
      })
    );
  }

  // ✅ logout
  logout(): void {
    const refreshToken = this.tokenService.getRefreshToken();

    this.apiService.post('/auth/logout', { refreshToken }).subscribe({
      complete: () => {
        this.tokenService.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
        this.noti.success(
          'Đăng xuất thành công',
          'Bạn đã đăng xuất khỏi hệ thống.'
        );
      },
    });
  }

  // ✅ Business logic: Check permissions
  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) ?? false;
  }

  // ✅ Business logic: Check roles❌❎
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) ?? false;
  }

  public loadCurrentUser(): void {
    let userLogin = null;
    this.apiService.get("/auth/userInfo").subscribe((res)=>{
      if(res && res.isSuccess && res.data){
        userLogin = res.data;
      }
    })
    this.currentUserSubject.next(userLogin);
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
