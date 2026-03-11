import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FillInBlankExercise,
  FillInBlankQuestion,
} from '../../model/lesson-content';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-fill-in-blank-exercise',
  templateUrl: './fill-in-blank-exercise.component.html',
  styleUrls: ['./fill-in-blank-exercise.component.scss'],
})
export class FillInBlankExerciseComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Output() onSubmit = new EventEmitter<any>();

  isSubmitted = false;
  originalData: any[] = [];
  focusedInputIndex: number | null = null;

  constructor(
    private readonly _noti: NzNotificationService
  ) { }

  ngOnInit() {
    // Fix: Actually assign the mapped result
    if (this.data && Array.isArray(this.data)) {
      this.data = this.data.map((q: any) => {
        return {
          ...q,
          userAnswer: q.userAnswer || '',
          isCorrect: undefined,
        };
      });
      // Store original data for reset
      this.originalData = JSON.parse(JSON.stringify(this.data));
    }
  }

  onInputFocus(event: any, index: number) {
    this.focusedInputIndex = index;
  }

  onInputBlur(event: any, index: number) {
    this.focusedInputIndex = null;
  }

  onInputChange() {
    // Trigger change detection if needed
  }

  getAnsweredCount(): number {
    if (!this.data || !Array.isArray(this.data)) return 0;
    return this.data.filter((q: any) => q.userAnswer?.trim()).length;
  }

  isAllAnswered(): boolean {
    if (!this.data || !Array.isArray(this.data)) return false;
    return this.data.every((q: any) => q.userAnswer?.trim());
  }

  handleSubmit() {
    let isValid = true;
    const emptyAnswers: number[] = [];

    // Validate all answers
    this.data.forEach((q: any, index: number) => {
      const answer = q.userAnswer?.trim();
      if (!answer || answer === '') {
        isValid = false;
        emptyAnswers.push(index + 1);
      }
    });

    if (!isValid) {
      const message = emptyAnswers.length === 1
        ? `Bạn chưa điền câu ${emptyAnswers[0]}!`
        : `Bạn chưa điền các câu: ${emptyAnswers.join(', ')}!`;
      this._noti.error("Lỗi", message);
      return;
    }

    // Mark as submitted
    this.isSubmitted = true;

    // Prepare answer model to send to parent/server
    const lstAnswer = this.data.map((q: any) => {
      return {
        id: q.id,
        userAnswer: q.userAnswer?.trim(),
      };
    });

    const modelAnswer = {
      answers: lstAnswer,
      idLesson: this.data.id || this.data[0]?.lessonId
    };

    // Emit event to parent - parent will call API and update isCorrect from server response
    this.onSubmit.emit(modelAnswer);
  }

  resetExercise() {
    this.isSubmitted = false;
    // Reset to original state
    this.data = JSON.parse(JSON.stringify(this.originalData));
    this.data.forEach((q: any) => {
      q.userAnswer = '';
      q.isCorrect = undefined;
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }
}
