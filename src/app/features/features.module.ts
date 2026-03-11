import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './features-routing.module';
import { CommonBaseModule } from '@shared/module/common/common-base.module';
import { AntCommonModule } from '@shared/module/common/ant-common.module';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    RouterModule.forChild(FEATURE_ROUTES),
    SharedModule,
  ],
  declarations: [],
})
export class FeaturesModule {}
