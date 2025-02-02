export interface IUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  // cart?: ICart;
}

export enum UserRole {
  'ADMIN' = 'admin',
  'USER' = 'user',
  'GUEST' = 'guest',
}

export interface IUserState {
  id: string;
  username: string;
  role: UserRole;
}
