import express from 'express';
import { BookController } from '../controller/Book.controller';
import { BookValidation } from '../middleware/BookValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const bookController = new BookController();
const bookValidation = new BookValidation();

router.get('/', bookController.getAllBooks);

router.get('/search', bookValidation.validateSearch, bookController.searchByTitleOrAuthor);

router.get('/:id', CommonValidation.validateId, bookController.getBookById);

router.post('/', bookValidation.validateCreateBook, bookController.createBook);

router.put('/:id', CommonValidation.validateId, bookValidation.validateUpdateBook, bookController.updateBook);

router.delete('/:id', CommonValidation.validateId, bookController.deleteBook);

export default router;
