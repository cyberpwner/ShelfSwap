import { UserRole } from '../types/userTypes';

export class UserDto {
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  profilePicUrl?: string;
}
