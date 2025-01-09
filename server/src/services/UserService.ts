import { UserDao } from '../dao/UserDao';
import { UserDto } from '../dto/UserDto';
import { User } from '../entity/User';

export class UserService {
  private readonly userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userDao.findAll();

    if (users.length === 0) return [];

    // sanitize users (remove sensitive data before sending to -> controller -> frontend)
    return users.map((user) => new UserDto(user));
  }

  async getUserById(id: number): Promise<UserDto | null> {
    const user = await this.userDao.findById(id);

    if (!user) return null;

    return new UserDto(user);
  }

  async createUser(user: User): Promise<UserDto> {
    const createdUser = await this.userDao.create(user);

    return new UserDto(createdUser);
  }

  async updateUser(id: number, user: Partial<User>): Promise<UserDto | null> {
    const updatedUser = await this.userDao.update(id, user);

    if (!updatedUser) return null;

    return new UserDto(updatedUser);
  }

  async deleteUser(id: number): Promise<UserDto | null> {
    const removedUser = await this.userDao.delete(id);

    if (!removedUser) return null;

    return new UserDto(removedUser);
  }
}
