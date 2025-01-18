import { BookDao } from '../dao/BookDao';
import { BookDto } from '../dto/BookDto';
import { Book } from '../entity/Book';
import { BookCategory } from '../types/categoryTypes';
import { MapperService } from './MapperService';

export class BookService {
  private readonly bookDao: BookDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.bookDao = new BookDao();
    this.mapperService = new MapperService();
  }

  async getAllBooks(): Promise<BookDto[]> {
    const books = await this.bookDao.findAll();

    if (books.length === 0) return [];

    return books.map((book) => this.mapperService.mapBookToDto(book));
  }

  async getBookById(id: number): Promise<BookDto | null> {
    const book = await this.bookDao.findById(id);

    if (!book) return null;

    return this.mapperService.mapBookToDto(book);
  }

  async createBook(book: Book, authorNames: string[], categoryNames: BookCategory[]): Promise<BookDto | null> {
    const createdBook = await this.bookDao.createBook(book, authorNames, categoryNames);

    if (!createdBook) return null;

    return this.mapperService.mapBookToDto(createdBook);
  }

  async updateBook(id: number, book: Partial<Book>): Promise<BookDto | null> {
    const updatedBook = await this.bookDao.update(id, book);

    if (!updatedBook) return null;

    return this.mapperService.mapBookToDto(updatedBook);
  }

  async deleteBook(id: number): Promise<BookDto | null> {
    const deletedBook = await this.bookDao.delete(id);

    if (!deletedBook) return null;

    return this.mapperService.mapBookToDto(deletedBook);
  }
}
