import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './features-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(FEATURE_ROUTES),
  ],
  declarations: [
  ]
})
export class FeaturesModule { }
