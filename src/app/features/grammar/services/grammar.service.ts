import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { IApiResponse } from '@core/models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrammarService {
  constructor(private readonly _api: ApiService) {}

  GetGrammars(): Observable<IApiResponse<any>> {
    return this._api.get(`/grammars`);
  }
  
  GetLesson(lessonId: string): Observable<IApiResponse<any>> {
    return this._api.get(`/lessons/${lessonId}`);
  }
}
