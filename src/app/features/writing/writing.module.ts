import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { writing_router } from './writing-routing.module';
import { WritingComponent } from './pages/writing/writing.component';
import { LessonDetailModule } from '@features/components/lesson-detail/lesson-detail.module';

@NgModule({
  imports: [
    RouterModule.forChild(writing_router),
    SharedModule,
    LessonDetailModule
  ],
  declarations: [
    WritingComponent
  ],
})
export class WritingModule {}

