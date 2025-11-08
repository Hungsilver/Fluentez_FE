import { NgModule } from '@angular/core';
import { GrammarModule } from './grammar/grammar.module';
import { RouterModule } from '@angular/router';
import { GRAMMAR_ROUTES } from './grammar/grammar-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(GRAMMAR_ROUTES),
    GrammarModule
  ],
  declarations: [
  ]
})
export class FeaturesModule { }
