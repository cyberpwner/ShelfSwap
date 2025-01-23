import { UserRole } from '../types/user.types.d';

export class UserDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  profilePicUrl?: string;
}
