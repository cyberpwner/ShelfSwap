import { User } from '../entities/User';

export async function isExistingUserByEmailOrUsername(user: User): Promise<boolean> {
  const usersFound = await User.createQueryBuilder('User')
    .where('`User`.username = :username', { username: user.username })
    .orWhere('`User`.email = :email', { email: user.email })
    .getMany();

  return usersFound.length > 0;
}
