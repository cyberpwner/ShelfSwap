import { User } from '../entity/User';
import { BaseDao } from './BaseDao';

export class UserDao implements BaseDao<User> {
  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async create(user: User): Promise<User | null> {
    return user.save();
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const existingUser = await User.findOne({ where: { id } });

    if (!existingUser) return null;

    Object.assign(existingUser, user);
    return existingUser.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingUser = await User.findOneBy({ id });

    if (!existingUser) return false;

    await User.remove(existingUser);
    return true;
  }
}
