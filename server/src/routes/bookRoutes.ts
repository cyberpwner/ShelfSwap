import express from 'express';
import { BookController } from '../controller/BookController';

const router = express.Router();
const bookController = new BookController();

router.get('/', bookController.getAllBooksHandler);

router.get('/:id', bookController.getBookByIdHandler);

router.post('/', bookController.createBookHandler);

router.put('/:id', bookController.updateBookHandler);

router.delete('/:id', bookController.deleteBookHandler);

export default router;
