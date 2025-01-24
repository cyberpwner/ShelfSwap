import { UserRole } from './user.types.d';

export interface AccessTokenPayload {
  id: string;
  username: string;
  role: UserRole;
}

export interface RefreshTokenPayload {
  id: string;
  username: string;
  role: UserRole;
}
