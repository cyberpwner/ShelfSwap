import { Book } from '../entity/Book';
import { BaseDao } from './BaseDao';

export class BookDao implements BaseDao<Book> {
  async findAll(): Promise<Book[]> {
    return Book.find({ relations: ['user'] });
  }

  async findById(id: number): Promise<Book | null> {
    return Book.findOne({ where: { id } });
  }

  async create(book: Book): Promise<Book> {
    // no duplicate check because the only unique column in Book is the id and that can't be duplicated since it's auto-generated and is a PK.
    return book.save();
  }

  async update(id: number, book: Partial<Book>): Promise<Book | null> {
    const existingBook = await Book.findOneBy({ id });

    if (!existingBook) return null;

    Object.assign(existingBook, book);
    return existingBook.save();
  }

  async delete(id: number): Promise<Book | null> {
    const existingBook = await Book.findOneBy({ id });

    if (!existingBook) return null;

    return Book.remove(existingBook);
  }
}
