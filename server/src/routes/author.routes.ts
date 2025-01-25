import express from 'express';
import { AuthorController } from '../controllers/Author.controller';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { AuthorValidation } from '../middleware/AuthorValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const authorController = new AuthorController();
const authorValidation = new AuthorValidation();
const auth = new Auth();

router.get('/', auth.authenticateAccessToken, auth.authorize([UserRole.ADMIN, UserRole.USER]), authorController.getAll);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  authorController.getById,
);

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  authorValidation.validateCreateAuthor,
  authorController.createAuthor,
);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  authorValidation.validateUpdateAuthor,
  authorController.updateAuthor,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  authorController.deleteAuthor,
);

export default router;
