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

router.get('/', auth.authenticateAccessToken, auth.authorize([UserRole.ADMIN]), userController.getAll);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  userController.getById,
);

router.post('/register', userValidation.validateRegister, userController.register);

router.post('/login', userValidation.validateLogin, userController.login);

router.post('/logout', userController.logout);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  userValidation.validateUpdate,
  userController.update,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  userController.delete,
);

export default router;
