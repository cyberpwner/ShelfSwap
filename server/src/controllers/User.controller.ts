import { RequestHandler } from 'express';
import { UserService } from '../services/User.service';
import { User } from '../entities/User';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateUserDto, LoginUserDto } from '../schemas/user.schemas';
import { UpdateBookDto } from '../schemas/book.schemas';
import { HttpStatusCode } from '../types/http.types.d';

export class UserController {
  private readonly userService = new UserService();

  getAllUsers: RequestHandler = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(HttpStatusCode.OK).json(users);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch users', error: error instanceof Error ? error.message : error });
    }
  };

  getUserById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);

      if (user == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch user', error: error instanceof Error ? error.message : error });
    }
  };

  register: RequestHandler = async (req: TypedRequestBody<CreateUserDto>, res) => {
    try {
      const user = new User();
      Object.assign(user, req.body);

      const createdUser = await this.userService.register(user);

      if (createdUser == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'User could not be created' });
        return;
      }

      res.status(HttpStatusCode.CREATED).json(createdUser);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to register user', error: error instanceof Error ? error.message : error });
    }
  };

  loginUser: RequestHandler = async (req: TypedRequestBody<LoginUserDto>, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login({ email, password });

      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        return;
      }

      // TODO: Generate JWT token here
      res.status(HttpStatusCode.OK).json({ message: 'Logged in successfully' });
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to login user', error: error instanceof Error ? error.message : error });
    }
  };

  updateUser: RequestHandler = async (req: TypedRequestBody<UpdateBookDto>, res) => {
    try {
      const id = req.params.id;
      const user = new User();
      Object.assign(user, req.body);

      const updatedUser = await this.userService.updateUser(id, user);

      if (updatedUser == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedUser);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update user', error: error instanceof Error ? error.message : error });
    }
  };

  deleteUser: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedUser = await this.userService.deleteUser(id);

      if (deletedUser == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedUser);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete user', error: error instanceof Error ? error.message : error });
    }
  };
}
