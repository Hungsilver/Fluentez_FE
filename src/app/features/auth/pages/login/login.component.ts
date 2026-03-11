import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService, StorageService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formInput: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private _noti: NzNotificationService,
    private _storage: StorageService,
    private socialAuthService: SocialAuthService
  ) {
    this.formInput = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log('Google User:', user);
      if (user && user.idToken) {
        this.authService.loginWithGoogle(user.idToken).subscribe({
          next: (res: any) => {
            if (res && res.data) {
              this._noti.success('Thành công', 'Đăng nhập Google thành công!');
              this.router.navigate(['/dashboard']);
            } else {
              this._noti.error('Đăng nhập thất bại', 'Vui lòng thử lại.');
            }
          },
          error: (err: any) => {
            this._noti.error('Đăng nhập thất bại', err.message || 'Vui lòng thử lại.');
          },
        });
      }
    });
  }

  getEmailError(): string {
    const emailControl = this.formInput.get('email');
    if (emailControl?.hasError('required') && emailControl?.touched) {
      return 'Vui lòng nhập email!';
    }
    if (emailControl?.hasError('email') && emailControl?.touched) {
      return 'Email không hợp lệ!';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.formInput.get('password');
    if (passwordControl?.hasError('required') && passwordControl?.touched) {
      return 'Vui lòng nhập mật khẩu!';
    }
    if (passwordControl?.hasError('minlength') && passwordControl?.touched) {
      return 'Mật khẩu phải có ít nhất 6 ký tự!';
    }
    return '';
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        const idToken = res?.idToken;
        if (!idToken) {
          this._noti.error('Lỗi', 'Không lấy được thông tin đăng nhập');
          return;
        }
        this.authService.loginWithGoogle(idToken).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            if (res && res.data) {
              this._noti.success('Thành công', 'Đăng nhập thành công!');
              // const { accessToken, refreshToken, ...userObj } = res.data;
              // this._storage.set('userLogin', userObj);
              this.router.navigate(['/dashboard']);
            } else {
              this._noti.error(
                'Đăng nhập thất bại',
                'Vui lòng kiểm tra lại thông tin đăng nhập.'
              );
            }
          },
          error: (err: any) => {
            this.isLoading = false;
            this._noti.error(
              'Đăng nhập thất bại',
              err.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.'
            );
          },
        });
      })
      .catch(err => {
        console.error('Google Login Error:', err);
        this._noti.error('Lỗi', 'Đăng nhập Google thất bại');
      });
  }

  loginWithFacebook(): void {
    // TODO: Implement Facebook login
    this._noti.info('Thông báo', 'Tính năng đăng nhập bằng Facebook đang được phát triển');
  }

  onSubmit(): void {
    if (this.formInput.invalid) {
      Object.keys(this.formInput.controls).forEach(key => {
        this.formInput.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.authService.login(this.formInput.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.data) {
          this._noti.success('Thành công', 'Đăng nhập thành công!');
          // const { accessToken, refreshToken, ...userObj } = res.data;
          // this._storage.set('userLogin', userObj);
          this.router.navigate(['/dashboard']);
        } else {
          this._noti.error(
            'Đăng nhập thất bại',
            'Vui lòng kiểm tra lại thông tin đăng nhập.'
          );
        }
      },
      error: (err) => {
        this.isLoading = false;
        this._noti.error(
          'Đăng nhập thất bại',
          err.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.'
        );
      },
    });
  }
}
