import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarListComponent } from './pages/grammar-list/grammar-list.component';
import { GrammarEditComponent } from './pages/grammar-edit/grammar-edit.component';
import { RouterModule } from '@angular/router';
import { GRAMMAR_ROUTES } from './grammar-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(GRAMMAR_ROUTES),
    CommonModule,
  ],
  declarations: [
    GrammarListComponent,
    GrammarEditComponent
  ]
})
export class GrammarModule { }
