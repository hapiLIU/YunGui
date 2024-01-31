export interface authModel {
  account: string;
  password: string;
}
export interface authResetModel {
  account: string;
  oldPassword: string;
  newPassword: string;
}
export interface updateUserModel {
  id: number;
  name: string;
  email?: string;
  birthday?: string;
}
