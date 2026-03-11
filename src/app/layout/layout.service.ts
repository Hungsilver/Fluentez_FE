import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { IApiResponse } from '@core/models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private _api: ApiService) {}
  Courses(): Observable<IApiResponse<any>>{
    return this._api.get<any>('/Courses');
  }
}
