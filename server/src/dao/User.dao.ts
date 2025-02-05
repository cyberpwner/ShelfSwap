import { User } from '../entities/User';
import { BaseDao } from './Base.dao';

type UserRelations = 'reviews' | 'purchases' | 'cart' | 'address';

export class UserDao implements BaseDao<User> {
  async findAll(page?: number, pageSize?: number): Promise<{ data: User[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [users, total] = await User.findAndCount({
      relations: ['address', 'cart', 'purchases', 'reviews'] as UserRelations[],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: users, total };
  }

  async findById(id: string): Promise<User | null> {
    return User.findOne({ where: { id }, relations: ['address', 'cart', 'purchases', 'reviews'] as UserRelations[] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return user.save();
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = new User();

    Object.assign(updatedUser, { id, ...user });
    return updatedUser.save();
  }

  async delete(id: string): Promise<User | null> {
    const existingUser = await User.findOneBy({ id });

    if (!existingUser) return null;

    return User.remove(existingUser);
  }
}
