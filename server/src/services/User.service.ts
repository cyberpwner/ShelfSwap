import { UserDao } from '../dao/User.dao';
import { UserDto } from '../dto/User.dto';
import { User } from '../entities/User';
import { isExistingUserByEmailOrUsername } from '../utils/user.utils';
import { MapperService } from './Mapper.service';

export class UserService {
  private readonly userDao: UserDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.userDao = new UserDao();
    this.mapperService = new MapperService();
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userDao.findAll();

    if (users.length === 0) return [];

    // sanitize users (remove sensitive data before sending to -> controller -> frontend)
    return users.map((user) => this.mapperService.mapUserToDto(user));
  }

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await this.userDao.findById(id);

    if (!user) return null;

    return this.mapperService.mapUserToDto(user);
  }

  async createUser(user: User): Promise<UserDto> {
    const isExisting = await isExistingUserByEmailOrUsername(user);

    if (isExisting) throw new Error('User already exists');

    // hash password before sending user to dao
    await user.hashPassword();

    const createdUser = await this.userDao.create(user);

    return this.mapperService.mapUserToDto(createdUser);
  }

  async updateUser(id: string, user: Partial<User>): Promise<UserDto | null> {
    const isExisting = await this.isExistingUser(id);

    if (!isExisting) return null;

    // hash the password if it is one of the fields to be updated
    if (user.password && user.hashPassword) {
      await user.hashPassword();
    }

    const updatedUser = await this.userDao.update(id, user);

    if (!updatedUser) return null;

    return this.mapperService.mapUserToDto(updatedUser);
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const removedUser = await this.userDao.delete(id);

    if (!removedUser) return null;

    return this.mapperService.mapUserToDto(removedUser);
  }

  async isExistingUser(userId: string): Promise<boolean> {
    return (await this.userDao.findById(userId)) ? true : false;
  }
}
