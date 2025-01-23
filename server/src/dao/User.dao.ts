import { User } from '../entity/User';
import { isDuplicatedUser } from '../utils/user.utils';
import { BaseDao } from './Base.dao';

export class UserDao implements BaseDao<User> {
  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findById(id: string): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
    const isDuplicate = await isDuplicatedUser(user);

    if (isDuplicate) {
      throw new Error('username or email is already taken');
    }

    return user.save();
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = new User();

    Object.assign(updatedUser, user);
    return updatedUser.save();
  }

  async delete(id: string): Promise<User | null> {
    const existingUser = await User.findOneBy({ id });

    if (!existingUser) return null;

    return User.remove(existingUser);
  }
}
