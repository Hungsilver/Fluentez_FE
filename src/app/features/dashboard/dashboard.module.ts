import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard-routing.module';
import { AntCommonModule } from '@shared/module/common/ant-common.module';
import { CommonBaseModule } from '@shared/module/common/common-base.module';

@NgModule({
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES),
    AntCommonModule,
    CommonBaseModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
