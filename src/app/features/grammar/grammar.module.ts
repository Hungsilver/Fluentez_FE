import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarListComponent } from './pages/grammar-list/grammar-list.component';
import { GrammarEditComponent } from './pages/grammar-edit/grammar-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GrammarListComponent,
    GrammarEditComponent
  ]
})
export class GrammarModule { }
