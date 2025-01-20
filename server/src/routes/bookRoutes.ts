import express from 'express';
import { BookController } from '../controller/BookController';
import { BookMiddleWare } from '../middleware/BookMiddleware';
import { CommonMiddleware } from '../middleware/CommonMiddleware';

const router = express.Router();
const bookController = new BookController();
const bookMiddlware = new BookMiddleWare();

router.get('/', bookController.getAllBooks);

router.get('/search', bookMiddlware.validateSearch, bookController.searchByTitleOrAuthor);

router.get('/:id', CommonMiddleware.validateId, bookController.getBookById);

router.post('/', bookMiddlware.validateCreateBook, bookController.createBook);

router.put('/:id', CommonMiddleware.validateId, bookMiddlware.validateUpdateBook, bookController.updateBook);

router.delete('/:id', CommonMiddleware.validateId, bookController.deleteBook);

export default router;
