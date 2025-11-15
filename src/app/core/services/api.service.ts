import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '@core/models/ApiResponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Generic GET method
  get<T>(endpoint: string, params?: any): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.apiUrl}${endpoint}`, {
      params,
    });
  }

  // ✅ Generic POST method
  post<T>(endpoint: string, data: any): Observable<IApiResponse<T>> {
    return this.http.post<IApiResponse<T>>(`${this.apiUrl}${endpoint}`, data);
  }

  // ✅ Generic PUT method
  put<T>(endpoint: string, data: any): Observable<IApiResponse<T>> {
    return this.http.put<IApiResponse<T>>(`${this.apiUrl}${endpoint}`, data);
  }

  // ✅ Generic DELETE method
  delete<T>(endpoint: string): Observable<IApiResponse<T>> {
    return this.http.delete<IApiResponse<T>>(`${this.apiUrl}${endpoint}`);
  }
}
