import { RequestHandler } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../entity/User';
import { TypedRequestBody } from '../types/expressTypes';
import { CreateUserDto } from '../schemas/userSchemas';
import { UpdateBookDto } from '../schemas/bookSchemas';

export class UserController {
  private readonly userService = new UserService();

  getAllUsers: RequestHandler = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error instanceof Error ? error.message : error });
    }
  };

  getUserById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);

      if (user == null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user', error: error instanceof Error ? error.message : error });
    }
  };

  createUser: RequestHandler = async (req: TypedRequestBody<CreateUserDto>, res) => {
    try {
      const user = new User();
      Object.assign(user, req.body);

      const createdUser = await this.userService.createUser(user);

      if (createdUser == null) {
        res.status(400).json({ message: 'User could not be created' });
        return;
      }

      res.status(200).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error: error instanceof Error ? error.message : error });
    }
  };

  updateUser: RequestHandler = async (req: TypedRequestBody<UpdateBookDto>, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = new User();
      Object.assign(user, req.body);

      const updatedUser = await this.userService.updateUser(id, user);

      if (updatedUser == null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error: error instanceof Error ? error.message : error });
    }
  };

  deleteUser: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedUser = await this.userService.deleteUser(id);

      if (deletedUser == null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error: error instanceof Error ? error.message : error });
    }
  };
}
