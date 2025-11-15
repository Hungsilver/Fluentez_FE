import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  imports: [
    NzGridModule,
    NzDropDownModule,
    NzToolTipModule,
    NzInputModule,
    NzAvatarModule,
    NzDividerModule,
    NzNotificationModule,
    NzButtonModule,
    NzCheckboxModule,
  ],
  exports: [
    NzGridModule,
    NzDropDownModule,
    NzToolTipModule,
    NzInputModule,
    NzAvatarModule,
    NzDividerModule,
    NzNotificationModule,
    NzButtonModule,
    NzCheckboxModule,
  ],
})
export class AntCommonModule {}
