export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  bio: null;
  avatarUrl: null;
}

export const enum UserRole {
  'ADMIN' = 'admin',
  'USER' = 'user',
  'GUEST' = 'guest',
}
