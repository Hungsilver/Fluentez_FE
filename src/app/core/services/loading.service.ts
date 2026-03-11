import { Injectable } from '@angular/core';
import { BehaviorSubject, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadingTimeout: any;
  private hideTimeout: any;
  private readonly MIN_LOADING_TIME = 500; // in milliseconds
  private readonly DELAY_BEFORE_SHOW = 200; // in milliseconds

  show() {

   // Clear timeout ẩn nếu đang chờ
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    // Chỉ hiện spinner nếu request chạy lâu hơn DELAY_BEFORE_SHOW
    if (!this.loadingTimeout) {
      this.loadingTimeout = setTimeout(() => {
        this.loadingSubject.next(true);
        this.loadingTimeout = null;
      }, this.DELAY_BEFORE_SHOW);
    }
  }

  hide() {
   // Clear timeout hiện nếu chưa kịp hiện
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
      return; // Không cần ẩn vì chưa hiện
    }

    // Nếu đang hiển thị, đảm bảo hiện tối thiểu MIN_LOADING_TIME
    if (this.loadingSubject.value) {
      this.hideTimeout = setTimeout(() => {
        this.loadingSubject.next(false);
        this.hideTimeout = null;
      }, this.MIN_LOADING_TIME);
    }
  }

  // Reset tất cả timeouts (dùng khi destroy component)
  reset() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.loadingSubject.next(false);
  }
}