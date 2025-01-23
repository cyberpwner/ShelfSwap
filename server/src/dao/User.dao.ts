import { User } from '../entity/User';
import { BaseDao } from './Base.dao';

export class UserDao implements BaseDao<User> {
  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findById(id: string): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
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
