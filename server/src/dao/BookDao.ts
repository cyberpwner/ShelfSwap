import { Book } from '../entity/Book';
import { BaseDao } from './BaseDao';

export class BookDao implements BaseDao<Book> {
  async findAll(): Promise<Book[]> {
    return Book.find();
  }

  async findById(id: number): Promise<Book | null> {
    return Book.findOne({ where: { id } });
  }

  async create(book: Book): Promise<Book | null> {
    return book.save();
  }

  async update(id: number, book: Partial<Book>): Promise<Book | null> {
    const existingBook = await Book.findOne({ where: { id } });

    if (!existingBook) return null;

    Object.assign(existingBook, book);
    return existingBook.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingBook = await Book.findOneBy({ id });

    if (!existingBook) return false;

    await Book.remove(existingBook);
    return true;
  }
}
