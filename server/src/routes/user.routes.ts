import express from 'express';
import { UserController } from '../controllers/User.controller';
import { UserValidation } from '../middleware/UserValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { Auth } from '../middleware/Auth.middleware';
import { UserRole } from '../types/user.types.d';

const router = express.Router();
const userController = new UserController();
const userValidation = new UserValidation();
const auth = new Auth();

router.get('/', auth.authenticate, auth.authorize([UserRole.ADMIN]), userController.getAllUsers);

router.get(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  userController.getUserById,
);

router.post('/login', userValidation.validateLogin, userController.loginUser);

router.post('/register', userValidation.validateRegister, userController.register);

router.put(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  userValidation.validateUpdate,
  userController.updateUser,
);

router.delete(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  userController.deleteUser,
);

export default router;
