/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from '../entity/User';
import { UserRole } from '../types/userTypes';

export class UserDto {
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  profilePicUrl?: string;

  constructor(user: Partial<User>) {
    this.username = user.username!;
    this.email = user.email!;
    this.role = user.role!;
    this.bio = user?.bio;
    this.profilePicUrl = user?.profilePicUrl;
  }
}
