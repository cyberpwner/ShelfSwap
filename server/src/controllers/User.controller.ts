import { RequestHandler } from 'express';
import { UserService } from '../services/User.service';
import { User } from '../entities/User';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateUserDto, LoginUserDto } from '../schemas/user.schemas';
import { UpdateUserDto } from '../schemas/user.schemas';
import { HttpStatusCode } from '../types/http.types.d';
import { generateAccessToken, generateRefreshToken, setTokensInCookies } from '../utils/jwt.utils';

export class UserController {
  private readonly userService = new UserService();

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = undefined;
    }

    const decodedPageNum = pageNum ? Number(decodeURIComponent(String(pageNum))) : undefined;
    const pageSize = decodedPageNum ? 10 : undefined;

    try {
      const { data, page, total, totalPages } = await this.userService.getAll(decodedPageNum, pageSize);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch users' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await this.userService.getById(id);

      if (user == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(user);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch user' });
    }
  };

  register: RequestHandler = async (req: TypedRequestBody<CreateUserDto>, res) => {
    try {
      const user = new User();
      Object.assign(user, req.body);

      const createdUser = await this.userService.register(user);

      if (createdUser == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'User could not be created' });
        return;
      }

      const accessToken = generateAccessToken({
        id: createdUser.id,
        username: createdUser.username,
        role: createdUser.role,
      });

      const refreshToken = generateRefreshToken({ id: createdUser.id });

      setTokensInCookies(res, accessToken, refreshToken);

      res.status(HttpStatusCode.CREATED).json({ user: createdUser });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to register user' });
    }
  };

  // for admin (doesn't generate and set tokens on cookies)
  createUser: RequestHandler = async (req: TypedRequestBody<CreateUserDto>, res) => {
    try {
      const user = new User();
      Object.assign(user, req.body);

      const createdUser = await this.userService.register(user);

      if (createdUser == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'User could not be created' });
        return;
      }

      res.status(HttpStatusCode.CREATED).json({ user: createdUser });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to register user' });
    }
  };

  login: RequestHandler = async (req: TypedRequestBody<LoginUserDto>, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login({ email, password });

      if (!user) {
        res.status(HttpStatusCode.FORBIDDEN).json({ error: 'Invalid credentials' });
        return;
      }

      const accessToken = generateAccessToken({ id: user.id, username: user.username, role: user.role });
      const refreshToken = generateRefreshToken({ id: user.id });

      setTokensInCookies(res, accessToken, refreshToken);

      res.status(HttpStatusCode.OK).json({ user });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to login user' });
    }
  };

  logout: RequestHandler = async (_req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.sendStatus(HttpStatusCode.NO_CONTENT);
  };

  update: RequestHandler = async (req: TypedRequestBody<UpdateUserDto>, res) => {
    try {
      const id = req.params.id;
      const user = new User();
      Object.assign(user, req.body);

      const updatedUser = await this.userService.updateUser(id, user);

      if (updatedUser == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedUser);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update user' });
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedUser = await this.userService.deleteUser(id);

      if (deletedUser == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedUser);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete user' });
    }
  };
}
