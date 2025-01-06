import { BookDao } from '../dao/BookDao';
import { Book } from '../entity/Book';

export class BookService {
  private bookDao: BookDao;

  constructor() {
    this.bookDao = new BookDao();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookDao.findAll();
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookDao.findById(id);
  }

  async createBook(book: Book): Promise<Book | null> {
    return this.bookDao.create(book);
  }

  async updateBook(id: number, book: Partial<Book>) {
    return this.bookDao.update(id, book);
  }

  async deleteBook(id: number): Promise<boolean> {
    return this.bookDao.delete(id);
  }
}
