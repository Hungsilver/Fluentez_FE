import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  success(message: string): void {
    this.add({ type: 'success', message });
  }

  error(message: string): void {
    this.add({ type: 'error', message });
  }

  warning(message: string): void {
    this.add({ type: 'warning', message });
  }

  info(message: string): void {
    this.add({ type: 'info', message });
  }

  private add(notification: Omit<Notification, 'id'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36)
    };

    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, newNotification]);

    // Auto remove after 5 seconds
    setTimeout(() => this.remove(newNotification.id), 5000);
  }

  remove(id: string): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }
}