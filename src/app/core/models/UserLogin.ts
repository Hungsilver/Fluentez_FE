export interface UserLogin {
  isLockedOut: boolean;
  avatarUrl: string;
  userName: string;
  displayName: string;
  phoneNumber: string;
  roleCodes: string;
  token: string;
}