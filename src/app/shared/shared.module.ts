import { NgModule } from '@angular/core';
import { CourseLayout1Component } from './components/course-layout-1/course-layout-1.component';
import { CommonBaseModule } from './module/common/common-base.module';
import { AntCommonModule } from './module/common/ant-common.module';
import { RouterModule, RouterOutlet } from '@angular/router';
@NgModule({
  imports: [
    CommonBaseModule,
    AntCommonModule,
    RouterModule,
    RouterOutlet
  ],
  declarations: [
    CourseLayout1Component
  ],
  exports:[
    CourseLayout1Component,
    AntCommonModule,
    CommonBaseModule
  ]
})
export class SharedModule { }
