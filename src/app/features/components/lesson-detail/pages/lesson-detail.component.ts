import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentType, LessonContent, LessonType, QuestionType } from '../model/lesson-content';
import { LessonService, LessonSubmitAnswerFilter, LessonAnswerDto } from '../services/Lesson.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  @Input() lessonId!: string;
  @Input() lesson: any;
  exercise: any = {};
  questionType = QuestionType;
  lessonType = LessonType;
  // ContentType = ContentType; // Expose enum to template

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private _noti: NzNotificationService,
  ) { }

  ngOnInit() {
    // const lessonId = +this.route.snapshot.paramMap.get('id');
    // if(this.lessonId)
    // this.loadLesson(this.lessonId);
  }

  loadLesson(id: any) {
    this.lessonService.GetLesson(id).subscribe({
      next: (res) => {
        if (!res.data || !res.isSuccess) {
          this._noti.error('Lỗi', 'Không tải được bài học.');
          return;
        }
        this.lesson = res.data;
        this.exercise = res.data.exercise;
      },
      error: (err) => console.error('Error loading lesson', err)
    });
  }

  onExerciseSubmit(answers: any) {
    if (!this.lesson?.id) {
      this._noti.error('Lỗi', 'Không tìm thấy bài học.');
      return;
    }

    // Build LessonSubmitAnswerFilter from exercise answers
    const lstAnswer: { [questionId: string]: string } = {};

    if (answers?.answers && Array.isArray(answers.answers)) {
      answers.answers.forEach((ans: any) => {
        if (ans.id && ans.userAnswer) {
          lstAnswer[ans.id] = ans.userAnswer;
        }
      });
    }

    const submitData: LessonSubmitAnswerFilter = {
      id: this.lesson.id,
      lstAnswer: lstAnswer
    };

    // Call API to submit
    this.lessonService.SubmitAnswers(submitData).subscribe({
      next: (res) => {
        if (!res.isSuccess || !res.data) {
          this._noti.error('Lỗi', 'Không thể gửi câu trả lời. Vui lòng thử lại.');
          return;
        }

        // Process response and update questions with server results
        const resultData: LessonAnswerDto = res.data;

        if (this.lesson?.questions && Array.isArray(this.lesson.questions)) {
          this.lesson.questions.forEach((question: any) => {
            const answerResult = resultData.lstAnswer?.find(
              (a) => a.idAnswer === question.id
            );
            if (answerResult) {
              question.isCorrect = answerResult.isCorrect ?? false;
              question.serverAnswer = answerResult.answer; // Đáp án đúng từ server nếu có
            }
          });
        }

        // Count correct answers
        const correctCount = resultData.lstAnswer?.filter(a => a.isCorrect).length || 0;
        const totalCount = resultData.lstAnswer?.length || 0;

        this._noti.success(
          'Hoàn thành!',
          `Bạn đã trả lời đúng ${correctCount}/${totalCount} câu.`
        );
      },
      error: (err) => {
        console.error('Error submitting answers', err);
        this._noti.error('Lỗi', 'Có lỗi xảy ra khi gửi câu trả lời.');
      }
    });
  }

  goToPreviousLesson() {

  }

  goToNextLesson() { }
}
