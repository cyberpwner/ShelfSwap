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

router.get('/', auth.authenticate, auth.authorize([UserRole.ADMIN, UserRole.USER]), authorController.getAllAuthors);

router.get(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  authorController.getAuthorById,
);

router.post(
  '/',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  authorValidation.validateCreateAuthor,
  authorController.createAuthor,
);

router.put(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  authorValidation.validateUpdateAuthor,
  authorController.updateAuthor,
);

router.delete(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  authorController.deleteAuthor,
);

export default router;
