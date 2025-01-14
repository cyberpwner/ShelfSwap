import { BookDao } from '../dao/BookDao';
import { BookDto } from '../dto/BookDto';
import { Book } from '../entity/Book';

export class BookService {
  private readonly bookDao: BookDao;

  constructor() {
    this.bookDao = new BookDao();
  }

  async getAllBooks(): Promise<BookDto[]> {
    const books = await this.bookDao.findAll();

    if (books.length === 0) return [];

    return books.map((book) => new BookDto(book));
  }

  async getBookById(id: number): Promise<BookDto | null> {
    const book = await this.bookDao.findById(id);

    if (!book) return null;

    return new BookDto(book);
  }

  async createBook(book: Book, authorNames: string[]): Promise<BookDto | null> {
    const createdBook = await this.bookDao.createBookWithAuthors(book, authorNames);

    if (!createdBook) return null;

    return new BookDto(createdBook);
  }

  async updateBook(id: number, book: Partial<Book>): Promise<BookDto | null> {
    const updatedBook = await this.bookDao.update(id, book);

    if (!updatedBook) return null;

    return new BookDto(updatedBook);
  }

  async deleteBook(id: number): Promise<BookDto | null> {
    const deletedBook = await this.bookDao.delete(id);

    if (!deletedBook) return null;

    return new BookDto(deletedBook);
  }
}
