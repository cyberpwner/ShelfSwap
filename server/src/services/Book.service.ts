import { BookDao } from '../dao/Book.dao';
import { BookDto } from '../dto/Book.dto';
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

  async getAll(): Promise<BookDto[]> {
    const books = await this.bookDao.findAll();

    if (books.length === 0) return [];

    return books.map((book) => this.mapperService.mapBookToDto(book));
  }

  async getById(id: string): Promise<BookDto | null> {
    const book = await this.bookDao.findById(id);

    if (!book) return null;

    return this.mapperService.mapBookToDto(book);
  }

  async searchByTitleOrAuthor(q: string): Promise<BookDto[]> {
    const books = await this.bookDao.searchByTitleOrAuthor(q);

    if (books.length === 0) return [];

    return books.map((book) => this.mapperService.mapBookToDto(book));
  }

  async createBook(book: Book, authorNames: string[], categoryNames: BookCategory[]): Promise<BookDto | null> {
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
