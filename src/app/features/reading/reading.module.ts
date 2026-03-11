import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { reading_router } from './reading-routing.module';
import { ReadingComponent } from './pages/reading/reading.component';
import { LessonDetailModule } from '@features/components/lesson-detail/lesson-detail.module';

@NgModule({
  imports: [
    RouterModule.forChild(reading_router),
    SharedModule,
    LessonDetailModule
  ],
  declarations: [
    ReadingComponent
  ],
})
export class ReadingModule {}

