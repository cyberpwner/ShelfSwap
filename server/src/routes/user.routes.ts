import express from 'express';
import { UserController } from '../controllers/User.controller';
import { UserValidation } from '../middleware/UserValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();

router.get('/', userController.getAllUsers);

router.get('/:id', CommonValidation.validateId, userController.getUserById);

router.post('/login', userValidation.validateLogin, userController.loginUser);

router.post('/register', userValidation.validateRegister, userController.register);

router.put('/:id', CommonValidation.validateId, userValidation.validateUpdate, userController.updateUser);

router.delete('/:id', CommonValidation.validateId, userController.deleteUser);

export default router;
