import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ADMIN_ROUTES } from './dashboard-admin-routing.module';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(DASHBOARD_ADMIN_ROUTES),
    CommonModule
  ]
})
export class DashboardAdminModule { }
