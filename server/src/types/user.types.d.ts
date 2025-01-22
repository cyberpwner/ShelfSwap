export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  bio?: string;
  profilePicUrl?: string;
}
