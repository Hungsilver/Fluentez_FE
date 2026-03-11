import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { IApiResponse } from '@core/models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadingService {
  constructor(private readonly _api: ApiService) {}

  GetReadings(): Observable<IApiResponse<any>> {
    return this._api.get(`/readings`);
  }
  
  GetLesson(lessonId: string): Observable<IApiResponse<any>> {
    return this._api.get(`/lessons/${lessonId}`);
  }
}

