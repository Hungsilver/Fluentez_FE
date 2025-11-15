import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

// interface JwtPayload {
//   idUser: string;          
//   userName: string;    
//   displayName: string;
//   email: string;
//   phoneNumber:string;
//   roleCodes: string;           
// }

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private cookieService: CookieService) { 

  }
  // Save tokens
  // setTokens(accessToken: string, refreshToken: string): void {
  //   localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  //   localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  // }

  setAccessToken(token :string , expiresDate?: string): void {
    const expiredDate = new Date(expiresDate ?? Date.now() + 60 * 60 * 1000);
    this.cookieService.set(this.ACCESS_TOKEN_KEY, token, {
      expires: expiredDate,
      path: '/',
      // secure: true, // Chỉ gửi qua HTTPS
      // sameSite: 'Strict', // Bảo vệ CSRF
    });
  }

  setRefreshToken(token: string, expiresDate?: string): void {
    const expiredDate = new Date(expiresDate ?? Date.now() + 7 * 24 * 60 * 60 * 1000);
    this.cookieService.set(this.REFRESH_TOKEN_KEY, token, {
      expires: expiredDate,
      path: '/',
      // secure: true, // Chỉ gửi qua HTTPS
      // sameSite: 'Strict', // Bảo vệ CSRF
    });
  }

  // Get access token
  getAccessToken(): string | null {
    return this.cookieService.get(this.ACCESS_TOKEN_KEY) || null;
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return this.cookieService.get(this.REFRESH_TOKEN_KEY) || null;
  }

  /**
   * Kiểm tra xem có token không
   */
  hasToken(): boolean {
    return this.cookieService.check(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Xóa access token
   */
  removeToken(): void {
    this.cookieService.delete(this.ACCESS_TOKEN_KEY, '/');
  }

  /**
   * Xóa refresh token
   */
  removeRefreshToken(): void {
    this.cookieService.delete(this.REFRESH_TOKEN_KEY, '/');
  }

  /**
   * Xóa tất cả tokens (logout)
   */
  clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  }

  /**
   * Lưu cả hai tokens cùng lúc
   */
  setTokens(token: string, refreshToken: string, tokenExpires?: string): void {
    this.setAccessToken(token, tokenExpires);
    this.setRefreshToken(refreshToken, tokenExpires);
  }
}