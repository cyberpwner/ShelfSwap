import { RequestHandler } from 'express';
import { BookService } from '../services/Book.service';
import { Book } from '../entity/Book';
import { BookCategory } from '../types/category.types';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { TypedRequestBody } from '../types/express.types';
import { CreateBookDto, UpdateBookDto } from '../schemas/book.schemas';

export class BookController implements InformativeError {
  private readonly bookService = new BookService();

  getAllBooks: RequestHandler = async (req, res) => {
    try {
      const books = await this.bookService.getAllBooks();

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books', error: this._getErrorInfo(error) });
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
      res.status(500).json({ message: 'Failed to fetch book', error: this._getErrorInfo(error) });
    }
  };

  searchByTitleOrAuthor: RequestHandler = async (req, res) => {
    const q = req.query.q;

    if (!q || String(q).trim() === '') {
      res.status(400).json({ message: "Query parameter 'q' is required" });
      return;
    }

    try {
      const searchResults = await this.bookService.searchByTitleOrAuthor(String(q));

      if (!searchResults) {
        res.status(404).json({ message: 'Not found' });
        return;
      }

      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: 'Failed to find book', error: this._getErrorInfo(error) });
    }
  };

  createBook: RequestHandler = async (req: TypedRequestBody<CreateBookDto>, res) => {
    try {
      const book = new Book();
      Object.assign(book, req.body.book);

      const authorNames: string[] = req.body.authors;
      const categoryNames: BookCategory[] = req.body.categories;

      const createdBook = await this.bookService.createBook(book, authorNames, categoryNames);

      if (createdBook == null) {
        res.status(400).json({ message: 'Book could not be created' });
        return;
      }

      res.status(200).json(createdBook);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create book', error: this._getErrorInfo(error) });
    }
  };

  updateBook: RequestHandler = async (req: TypedRequestBody<UpdateBookDto>, res) => {
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

    const deletedBook = await this.bookService.deleteBook(id);

    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json({ deletedBook });
  };

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
