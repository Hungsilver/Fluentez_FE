import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntCommonModule } from '@shared/module/common/ant-common.module';
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    AntCommonModule,
    HeaderComponent
],
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  // userLogin: Observable<string> | undefined;
  constructor(
  ) {}

  ngOnInit() {
  }
}
