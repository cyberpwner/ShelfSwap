import express from 'express';
import { CategoryController } from '../controllers/Category.controller';
import { CategoryValidation } from '../middleware/CategoryValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const categoryController = new CategoryController();
const categoryValidation = new CategoryValidation();
const auth = new Auth();

router.get(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  categoryController.getByName,
  categoryController.getAll,
);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  categoryController.getById,
);

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  categoryValidation.validateCreateCategory,
  categoryController.createCategory,
);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  categoryValidation.validateUpdateCategory,
  categoryController.updateCategory,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  categoryController.deleteCategory,
);

export default router;
