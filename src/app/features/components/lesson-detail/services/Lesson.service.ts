import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { IApiResponse } from '@core/models/ApiResponse';
import { Observable } from 'rxjs';

// Request model
export interface LessonSubmitAnswerFilter {
  id: string; // lessonId
  lstAnswer: { [questionId: string]: string }; // Dictionary<Guid, string>
}

// Response models
export interface LessonAnswerDtoRes {
  idAnswer: string;
  idLesson: string;
  answer?: string;
  isCorrect?: boolean;
}

export interface LessonAnswerDto {
  id: string; // lessonId
  lstAnswer: LessonAnswerDtoRes[];
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private _api: ApiService) { }

  GetLesson(lessonId: string): Observable<IApiResponse<any>> {
    return this._api.get(`/lessons/${lessonId}`);
  }

  SubmitAnswers(data: LessonSubmitAnswerFilter): Observable<IApiResponse<LessonAnswerDto>> {
    return this._api.post(`/lessons/submit`, data);
  }
}
