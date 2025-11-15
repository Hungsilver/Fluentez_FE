import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { IApiResponse } from '@core/models/ApiResponse';
import { environment } from 'environments/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const http = inject(HttpClient);
  const router = inject(Router);
  const REFRESH_TOKEN_URL = '/auth/refresh-token';
   const apiUrl = environment.apiUrl;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        console.log(error);
        
      if (error.status === 401 && !req.url.includes('/auth/refresh-token')) {
        // Try to refresh token
        const refreshToken = tokenService.getRefreshToken();

        if (refreshToken) {
           return http.post<any>(`${apiUrl}${REFRESH_TOKEN_URL}`, {refreshToken}).pipe(
            // this.apiService.post<any>('/auth/refresh-token', { refreshToken });
        //   return authService.refreshToken(refreshToken).pipe(
            filter(res=>res && res.isSuccess && res.data),
            take(1), 
            switchMap(res => {
              // Save new tokens
              if(res && res.isSuccess && res.data){
                console.log(res);
                
                  tokenService.setTokens(res.data.accessToken, res.data.refreshToken);
                  
                  // Retry original request with new token
                  const clonedReq = req.clone({
                      setHeaders: {
                          Authorization: `Bearer ${res.data.accessToken}`
                        }
                    });
                    
                    return next(clonedReq);
                }
                return throwError(()=>"Lỗi set token");
            }),
            catchError(refreshError => {
              // Refresh failed - logout
            //   authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};