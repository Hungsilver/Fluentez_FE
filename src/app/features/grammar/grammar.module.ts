import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { grammar_router } from './grammar-routing.module';
import { GrammarComponent } from './pages/grammar/grammar.component';
import { GrammarEditComponent } from './pages/grammar-edit/grammar-edit.component';
import { LessonDetailModule } from '@features/components/lesson-detail/lesson-detail.module';

@NgModule({
  imports: [
    RouterModule.forChild(grammar_router),
    SharedModule,
    LessonDetailModule
  ],
  declarations: [
    GrammarComponent,
    GrammarEditComponent
  ],
})
export class GrammarModule {}
