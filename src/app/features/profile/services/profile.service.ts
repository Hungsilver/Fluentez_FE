import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { IApiResponse } from '@core/models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly _api: ApiService) {}

  getProfile(): Observable<IApiResponse<any>> {
    return this._api.get(`/auth/userInfo`);
  }

  updateProfile(data: any): Observable<IApiResponse<any>> {
    return this._api.put(`/auth/profile`, data);
  }

  uploadAvatar(file: File): Observable<IApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this._api.post(`/auth/upload-avatar`, formData);
  }
}

