import express from 'express';
import { UserController } from '../controller/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsersHandler);

router.get('/:id', userController.getUserByIdHandler);

router.post('/', userController.createUserHandler);

router.put('/:id', userController.updateUserHandler);

router.delete('/:id', userController.deleteUserHandler);

export default router;
