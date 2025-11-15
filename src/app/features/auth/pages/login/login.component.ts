import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private _noti: NzNotificationService,
    private _storage: StorageService
  ) {
    this.formInput = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.formInput.invalid) return;

    this.authService.login(this.formInput.value).subscribe({
      next: (res) => {
        if (res && res.data) {
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
      error: (err) =>
        this._noti.error(
          'Đăng nhập thất bại',
          err.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.'
        ),
    });
  }
}
