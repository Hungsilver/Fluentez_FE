import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, filter, map, Observable, take, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IApiResponse } from '@core/models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  public isLoaded$ = this.isLoadedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable().pipe(
    distinctUntilChanged()
  );

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router,
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
        this.loadCurrentUser();
        // this.currentUserSubject.next(res.data);
      }),
      catchError((error) => {
        console.error('Đăng nhập không thành công:', error);
        return throwError(() => error);
      })
    );
  }

  loginWithGoogle(idToken: string): Observable<IApiResponse<any>> {
    return this.apiService.post<any>('/auth/google-login', { idToken }).pipe(
      tap((res) => {
        if (res.data && res.isSuccess && res.data) {
          const { accessToken, refreshToken, expirationDate } = res.data;
          this.tokenService.setTokens(
            accessToken,
            refreshToken,
            expirationDate
          );
        }
        this.loadCurrentUser();
        // this.currentUserSubject.next(res.data);
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
    // if(!this.tokenService.hasToken()){
    //   this.currentUserSubject.next(null);
    // }
    this.apiService.get("/auth/userInfo").subscribe((res: any) => {
      if (res && res.isSuccess && res.data) {
        this.currentUserSubject.next(res.data);
        this.isLoadedSubject.next(true);
        // this.router.navigate(['']);
        return;
      }
      this.noti.error("Lỗi", "Không lấy được thông tin đăng nhập")
      this.currentUserSubject.next(null);
      this.isLoadedSubject.next(true);
    })
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

  public checkAuthStatus(): Observable<boolean> {
    // Đợi cho đến khi quá trình tải người dùng hoàn tất
    return this.isLoaded$.pipe(
      // Lấy giá trị đầu tiên sau khi 'isLoaded' là true
      filter(loaded => loaded),
      take(1),
      // Sau đó kiểm tra trạng thái xác thực
      map(() => this.isAuthenticated())
    );
  }
}
