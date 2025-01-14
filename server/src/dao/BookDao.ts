import { Author } from '../entity/Author';
import { Book } from '../entity/Book';
import { AppDataSource } from '../utils/dataSource';
import { BaseDao } from './BaseDao';

export class BookDao implements BaseDao<Book> {
  async findAll(): Promise<Book[]> {
    return Book.find();
  }

  async findById(id: number): Promise<Book | null> {
    return Book.findOne({ where: { id } });
  }

  async create(book: Book): Promise<Book> {
    // no duplicate check because the only unique column in Book is the id and that can't be duplicated since it's auto-generated and is a PK.
    return book.save();
  }

  async createBookWithAuthors(book: Book, authorNames: string[]): Promise<Book> {
    const createdBook = await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      // fetch authors from DB or create them if they don't exist
      const authors = await Promise.all(
        authorNames.map(async (name) => {
          let author = await transactionalEntityManager.findOne(Author, { where: { name } });

          if (!author) {
            author = transactionalEntityManager.create(Author, { name });
            await transactionalEntityManager.save(author);
          }

          return author;
        }),
      );

      const newBook = transactionalEntityManager.create(Book, {
        ...book,
        authors,
      });

      return transactionalEntityManager.save(newBook);
    });

    return createdBook;
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
