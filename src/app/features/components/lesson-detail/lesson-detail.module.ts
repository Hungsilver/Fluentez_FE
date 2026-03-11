import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { LessonDetailComponent } from './pages/lesson-detail.component';
import { FillInBlankExerciseComponent } from './components/fill-in-blank-exercise/fill-in-blank-exercise.component';
import { MultipleChoiceExerciseComponent } from './components/multiple-choice-exercise/multiple-choice-exercise.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LessonDetailComponent,
    FillInBlankExerciseComponent,
    MultipleChoiceExerciseComponent,
  ],
  exports: [
    LessonDetailComponent,
    FillInBlankExerciseComponent,
    MultipleChoiceExerciseComponent,
  ],
})
export class LessonDetailModule {}
