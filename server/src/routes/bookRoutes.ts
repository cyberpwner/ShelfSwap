import express from 'express';
import { BookController } from '../controller/BookController';
import { BookMiddleWare } from '../middleware/BookMiddleware';

const router = express.Router();
const bookController = new BookController();
const bookMiddlware = new BookMiddleWare();

router.get('/', bookController.getAllBooks);

router.get('/search', bookMiddlware.validateSearch, bookController.searchByTitleOrAuthor);

router.get('/:id', bookMiddlware.validateId, bookController.getBookById);

router.post('/', bookMiddlware.validateNewBook, bookController.createBook);

router.put('/:id', bookMiddlware.validateId, bookMiddlware.validateUpdatedBook, bookController.updateBook);

router.delete('/:id', bookMiddlware.validateId, bookController.deleteBook);

export default router;
