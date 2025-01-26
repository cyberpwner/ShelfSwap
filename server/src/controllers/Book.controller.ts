import { RequestHandler } from 'express';
import { BookService } from '../services/Book.service';
import { Book } from '../entities/Book';
import { BookCategory } from '../types/category.types.d';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateBookDto, UpdateBookDto } from '../schemas/book.schemas';
import sanitize from 'sanitize-html';
import { HttpStatusCode } from '../types/http.types.d';
import { deleteImageFromCloud, uploadBookCover } from '../utils/upload.utils';
export class BookController implements InformativeError {
  private readonly bookService = new BookService();

  getAll: RequestHandler = async (_req, res) => {
    try {
      const books = await this.bookService.getAll();

      res.status(HttpStatusCode.OK).json(books);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch books', error: this._getErrorInfo(error) });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const book = await this.bookService.getById(id);

      if (book == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Book not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(book);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch book', error: this._getErrorInfo(error) });
    }
  };

  searchByTitleOrAuthor: RequestHandler = async (req, res) => {
    const q = req.query.q;

    if (!q || String(q).trim() === '') {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Query parameter 'q' is required" });
      return;
    }

    // sanitize the query before using it

    const decodedQuery = decodeURIComponent(String(q));
    const sanitizedQuery = sanitize(decodedQuery);

    try {
      const searchResults = await this.bookService.searchByTitleOrAuthor(sanitizedQuery);

      if (!searchResults) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(searchResults);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to find book', error: this._getErrorInfo(error) });
    }
  };

  createBook: RequestHandler = async (req: TypedRequestBody<CreateBookDto>, res) => {
    let cloudinaryResult;

    try {
      const file = req?.file;

      if (!file) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'No image file provided' });
        return;
      }

      cloudinaryResult = await uploadBookCover(file.path);

      const book = new Book();
      Object.assign(book, req.body.book);

      const authorNames: string[] = req.body.authors;
      const categoryNames: BookCategory[] = req.body.categories;

      const createdBook = await this.bookService.createBook(book, authorNames, categoryNames);

      if (createdBook == null) {
        // rollback image upload
        if (cloudinaryResult?.public_id) deleteImageFromCloud(cloudinaryResult.public_id);

        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Book could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdBook);
    } catch (error) {
      // rollback image upload
      if (cloudinaryResult?.public_id) deleteImageFromCloud(cloudinaryResult.public_id);

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create book', error: this._getErrorInfo(error) });
    }
  };

  updateBook: RequestHandler = async (req: TypedRequestBody<UpdateBookDto>, res) => {
    const id = req.params.id;
    const book = req.body;

    const updatedBook = await this.bookService.updateBook(id, book);

    if (updatedBook == null) {
      res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Book not found' });
      return;
    }

    res.status(HttpStatusCode.OK).json(updatedBook);
  };

  deleteBook: RequestHandler = async (req, res) => {
    const id = req.params.id;

    const deletedBook = await this.bookService.deleteBook(id);

    if (!deletedBook) {
      res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Book not found' });
      return;
    }

    res.status(HttpStatusCode.OK).json({ deletedBook });
  };

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
