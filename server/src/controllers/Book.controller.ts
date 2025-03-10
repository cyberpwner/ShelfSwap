import { RequestHandler } from 'express';
import { BookService } from '../services/Book.service';
import { Book } from '../entities/Book';
import { BookCategory } from '../types/category.types.d';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateBookDto, UpdateBookDto } from '../schemas/book.schemas';
import sanitize from 'sanitize-html';
import { HttpStatusCode } from '../types/http.types.d';
export class BookController implements InformativeError {
  private readonly bookService = new BookService();

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = undefined;
    }

    const decodedPageNum = pageNum ? Number(decodeURIComponent(String(pageNum))) : undefined;
    const pageSize = decodedPageNum ? 10 : undefined;

    try {
      const { data, page, total, totalPages } = await this.bookService.getAll(decodedPageNum, pageSize);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch books' });
    }
  };

  searchByTitleOrAuthor: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = undefined;
    }

    const decodedPageNum = pageNum ? Number(decodeURIComponent(String(pageNum))) : undefined;
    const pageSize = decodedPageNum ? 10 : undefined;

    let q = req.query?.q;

    if (!q || String(q).trim() === '') {
      q = '';
    }

    // sanitize the query before using it

    const decodedQuery = decodeURIComponent(String(q));
    const sanitizedQuery = sanitize(decodedQuery);

    try {
      const { data, page, total, totalPages } = await this.bookService.searchByTitleOrAuthor(
        sanitizedQuery,
        decodedPageNum,
        pageSize,
      );

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to search for book' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const book = await this.bookService.getById(id);

      if (book == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Book not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(book);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch book' });
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
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Book could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdBook);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create book' });
    }
  };

  updateBook: RequestHandler = async (req: TypedRequestBody<UpdateBookDto>, res) => {
    const id = req.params.id;
    const book = req.body;

    const updatedBook = await this.bookService.updateBook(id, book);

    if (updatedBook == null) {
      res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Book not found' });
      return;
    }

    res.status(HttpStatusCode.OK).json(updatedBook);
  };

  deleteBook: RequestHandler = async (req, res) => {
    const id = req.params.id;

    const deletedBook = await this.bookService.deleteBook(id);

    if (!deletedBook) {
      res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Book not found' });
      return;
    }

    res.status(HttpStatusCode.OK).json({ deletedBook });
  };

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
