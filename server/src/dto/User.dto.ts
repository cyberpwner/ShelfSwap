import { UserRole } from '../types/user.types';

export class UserDto {
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  profilePicUrl?: string;
}
