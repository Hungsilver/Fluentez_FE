import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core';
import { ProfileService } from '@features/profile/services/profile.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  userInfo: any = null;
  avatarUrl: string = '';
  fileList: NzUploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private _noti: NzNotificationService
  ) {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10,11}$/)]],
      address: [''],
      dateOfBirth: [''],
      gender: [''],
      bio: [''],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userInfo = user;
        this.avatarUrl = user.avatarUrl || '';
        this.profileForm.patchValue({
          userName: user.userName || '',
          displayName: user.displayName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          address: user.address || '',
          dateOfBirth: user.dateOfBirth || '',
          gender: user.gender || '',
          bio: user.bio || '',
        });
      }
      this.isLoading = false;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      // Reset form khi hủy edit
      this.loadProfile();
    }
  }

  customRequest = (item: NzUploadXHRArgs): Subscription => {
    const file = item.file as any;
    const fileObj = file.originFileObj || file;
    
    return this.profileService.uploadAvatar(fileObj).subscribe({
      next: (res) => {
        if (res && res.isSuccess && res.data) {
          this.avatarUrl = res.data.url || res.data.avatarUrl || this.avatarUrl;
          item.onSuccess?.(res, item.file, null as any);
          this._noti.success('Thành công', 'Cập nhật avatar thành công!');
          this.authService.loadCurrentUser();
        } else {
          item.onError?.(new Error('Upload failed'), item.file as any);
        }
      },
      error: (err) => {
        item.onError?.(err, item.file as any);
        this._noti.error('Lỗi', 'Tải ảnh lên thất bại!');
      }
    });
  };

  handleAvatarChange(info: any): void {
    if (info.type === 'success') {
      // Already handled in customRequest
    } else if (info.type === 'error') {
      this._noti.error('Lỗi', 'Tải ảnh lên thất bại!');
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const fileObj = file.originFileObj || file as any;
    if (!fileObj) return false;
    
    const isJpgOrPng = fileObj.type === 'image/jpeg' || fileObj.type === 'image/png';
    if (!isJpgOrPng) {
      this._noti.error('Lỗi', 'Chỉ chấp nhận file JPG/PNG!');
      return false;
    }
    const isLt2M = fileObj.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this._noti.error('Lỗi', 'Kích thước file phải nhỏ hơn 2MB!');
      return false;
    }
    return true;
  };

  onSubmit() {
    if (this.profileForm.invalid) {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.isSuccess) {
          this._noti.success('Thành công', 'Cập nhật thông tin thành công!');
          this.isEditMode = false;
          this.authService.loadCurrentUser();
        } else {
          this._noti.error('Lỗi', 'Cập nhật thông tin thất bại!');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this._noti.error('Lỗi', err.message || 'Cập nhật thông tin thất bại!');
      },
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName);
    if (control?.hasError('required') && control?.touched) {
      return 'Trường này là bắt buộc!';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Email không hợp lệ!';
    }
    if (control?.hasError('pattern') && control?.touched) {
      return 'Số điện thoại không hợp lệ!';
    }
    return '';
  }
}

