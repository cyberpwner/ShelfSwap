import express from 'express';
import { BookController } from '../controllers/Book.controller';
import { BookValidation } from '../middleware/BookValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { Auth } from '../middleware/Auth.middleware';
import { UserRole } from '../types/user.types.d';

const router = express.Router();
const bookController = new BookController();
const bookValidation = new BookValidation();
const auth = new Auth();

router.get('/', bookController.getAllBooks);

router.get('/search', bookValidation.validateSearch, bookController.searchByTitleOrAuthor);

router.get('/:id', CommonValidation.validateId, bookController.getBookById);

router.post(
  '/',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  bookValidation.validateCreateBook,
  bookController.createBook,
);

router.put(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  bookValidation.validateUpdateBook,
  bookController.updateBook,
);

router.delete(
  '/:id',
  auth.authenticate,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  bookController.deleteBook,
);

export default router;
