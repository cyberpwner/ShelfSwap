import { RequestHandler } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../entity/User';

export class UserController {
  private userService = new UserService();

  getAllUsersHandler: RequestHandler = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      // omit users sensitive data
      const publicUsers = users.map((user) => ({ ...user, password: undefined }));

      res.status(200).json(publicUsers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error instanceof Error ? error.message : error });
    }
  };

  getUserByIdHandler: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);

      if (user == null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // TODO: Make sure to omit sensitive data returned from  the DB (password...)
      res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user', error: error instanceof Error ? error.message : error });
    }
  };

  createUserHandler: RequestHandler = async (req, res) => {
    try {
      const user = new User();
      Object.assign(user, req.body);

      const createdUser = await this.userService.createUser(user);

      if (createdUser == null) {
        res.status(400).json({ message: 'User could not be created' });
        return;
      }

      res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error: error instanceof Error ? error.message : error });
    }
  };

  updateUserHandler: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = req.body;

    const updatedUser = await this.userService.updateUser(id, user);

    if (updatedUser == null) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ ...updatedUser, password: undefined });
  };

  deleteUserHandler: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const isDeleted = await this.userService.deleteUser(id);

    if (!isDeleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  };
}
