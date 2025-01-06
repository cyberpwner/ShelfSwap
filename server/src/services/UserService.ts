import { UserDao } from '../dao/UserDao';
import { User } from '../entity/User';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userDao.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userDao.findById(id);
  }

  async createUser(user: User): Promise<User | null> {
    return this.userDao.create(user);
  }

  async updateUser(id: number, user: Partial<User>) {
    return this.userDao.update(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userDao.delete(id);
  }
}
