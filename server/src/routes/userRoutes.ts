import express from 'express';
import { UserController } from '../controller/UserController';
import { UserMiddleware } from '../middleware/UserMiddleware';
import { CommonMiddleware } from '../middleware/CommonMiddleware';

const router = express.Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

router.get('/', userController.getAllUsers);

router.get('/:id', CommonMiddleware.validateId, userController.getUserById);

router.post('/', userMiddleware.validateCreateUser, userController.createUser);

router.put('/:id', CommonMiddleware.validateId, userMiddleware.validateUpdateUser, userController.updateUser);

router.delete('/:id', CommonMiddleware.validateId, userController.deleteUser);

export default router;
