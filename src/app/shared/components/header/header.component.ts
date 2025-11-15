import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntCommonModule } from '@shared/module/common/ant-common.module';
import { AuthService } from '@core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    AntCommonModule,
  ],
})
export class HeaderComponent implements OnInit{
  userLogin!: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(res=>{
      this.userLogin = res
    }
    );
  }

  onLogOut() {
    this.authService.logout();
  }
}
