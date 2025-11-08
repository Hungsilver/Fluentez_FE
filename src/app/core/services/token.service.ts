import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  nameid: string;           // User ID
  unique_name: string;      // Username
  email: string;
  FullName: string;
  role: string[];           // Roles
  permission: string[];     // Permissions
  exp: number;              // Expiration
  iat: number;              // Issued at
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // Save tokens
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Clear tokens
  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Decode JWT token
  decodeToken(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      return {
        id: parseInt(decoded.nameid),
        username: decoded.unique_name,
        email: decoded.email,
        fullName: decoded.FullName,
        roles: Array.isArray(decoded.role) ? decoded.role : [decoded.role],
        permissions: Array.isArray(decoded.permission) 
          ? decoded.permission 
          : [decoded.permission]
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate < new Date();
    } catch {
      return true;
    }
  }

  // Get token expiration date
  getTokenExpirationDate(token: string): Date | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }
}