import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { listening_router } from './listening-routing.module';
import { ListeningComponent } from './pages/listening/listening.component';
import { LessonDetailModule } from '@features/components/lesson-detail/lesson-detail.module';

@NgModule({
  imports: [
    RouterModule.forChild(listening_router),
    SharedModule,
    LessonDetailModule
  ],
  declarations: [
    ListeningComponent
  ],
})
export class ListeningModule {}

