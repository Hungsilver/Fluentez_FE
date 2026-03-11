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
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';


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
    NzMenuModule,
    NzSpinModule,
    NzIconModule,
    NzFormModule,
    NzUploadModule,
    NzSelectModule,
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
    NzMenuModule,
    NzSpinModule,
    NzIconModule,
    NzFormModule,
    NzUploadModule,
    NzSelectModule,
  ],
})
export class AntCommonModule {}
