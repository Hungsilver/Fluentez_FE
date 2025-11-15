import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './auth-routing.module';
import { CommonBaseModule } from '@shared/module/common/common-base.module';
import { AntCommonModule } from '@shared/module/common/ant-common.module';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonBaseModule,
    AntCommonModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ]
})
export class AuthModule { }
