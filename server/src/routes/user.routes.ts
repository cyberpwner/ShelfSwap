import express from 'express';
import { UserController } from '../controller/User.controller';
import { UserValidation } from '../middleware/UserValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();

router.get('/', userController.getAllUsers);

router.get('/:id', CommonValidation.validateId, userController.getUserById);

router.post('/', userValidation.validateCreateUser, userController.createUser);

router.put('/:id', CommonValidation.validateId, userValidation.validateUpdateUser, userController.updateUser);

router.delete('/:id', CommonValidation.validateId, userController.deleteUser);

export default router;
