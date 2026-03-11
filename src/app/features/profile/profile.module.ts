import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { profile_router } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild(profile_router),
    SharedModule,
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule {}

