import { BookDao } from '../dao/Book.dao';
import { BookDto } from '../dto/Book.dto';
import { PaginatedDto } from '../dto/Paginated.dto';
import { Book } from '../entities/Book';
import { BookCategory } from '../types/category.types.d';
import { MapperService } from './Mapper.service';

export class BookService {
  private readonly bookDao: BookDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.bookDao = new BookDao();
    this.mapperService = new MapperService();
  }

  async getAll(page = 1, pageSize = 10): Promise<PaginatedDto<BookDto>> {
    const { data: books, total } = await this.bookDao.findAll(page, pageSize);

    if (books.length === 0) {
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: books.map((book) => this.mapperService.mapBookToDto(book)),
      total,
      page,
      totalPages,
    };
  }

  async getById(id: string): Promise<BookDto | null> {
    const book = await this.bookDao.findById(id);

    if (!book) return null;

    return this.mapperService.mapBookToDto(book);
  }

  async searchByTitleOrAuthor(q: string, page = 1, pageSize = 10): Promise<PaginatedDto<BookDto>> {
    const { data: books, total } = await this.bookDao.searchByTitleOrAuthor(q, page, pageSize);

    if (books.length === 0) {
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: books.map((book) => this.mapperService.mapBookToDto(book)),
      total,
      page,
      totalPages,
    };
  }

  async createBook(book: Book, authorNames: string[], categoryNames: BookCategory[]): Promise<BookDto | null> {
    const existingBook = await this.bookDao.findByIsbn(book.isbn);

    if (existingBook) throw new Error('Book already exists');

    const createdBook = await this.bookDao.createBook(book, authorNames, categoryNames);

    if (!createdBook) return null;

    return this.mapperService.mapBookToDto(createdBook);
  }

  async updateBook(id: string, book: Partial<Book>): Promise<BookDto | null> {
    const updatedBook = await this.bookDao.update(id, book);

    if (!updatedBook) return null;

    return this.mapperService.mapBookToDto(updatedBook);
  }

  async deleteBook(id: string): Promise<BookDto | null> {
    const deletedBook = await this.bookDao.delete(id);

    if (!deletedBook) return null;

    return this.mapperService.mapBookToDto(deletedBook);
  }
}
