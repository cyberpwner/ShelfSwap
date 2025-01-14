import { RequestHandler } from 'express';
import { BookService } from '../services/BookService';
import { Book } from '../entity/Book';

export class BookController {
  private readonly bookService = new BookService();

  getAllBooks: RequestHandler = async (req, res) => {
    try {
      const books = await this.bookService.getAllBooks();

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books', error: error instanceof Error ? error.message : error });
    }
  };

  getBookById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const book = await this.bookService.getBookById(id);

      if (book == null) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch book', error: error instanceof Error ? error.message : error });
    }
  };

  createBook: RequestHandler = async (req, res) => {
    try {
      const book = new Book();
      Object.assign(book, req.body.book);

      const authorNames: string[] = req.body.authors;

      const createdBook = await this.bookService.createBook(book, authorNames);

      if (createdBook == null) {
        res.status(400).json({ message: 'Book could not be created' });
        return;
      }

      res.status(200).json(createdBook);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create book', error: error instanceof Error ? error.message : error });
    }
  };

  updateBook: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = req.body;

    const updatedBook = await this.bookService.updateBook(id, book);

    if (updatedBook == null) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(updatedBook);
  };

  deleteBook: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const isDeleted = await this.bookService.deleteBook(id);

    if (!isDeleted) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  };
}
