import { Author } from '../entities/Author';
import { Book } from '../entities/Book';
import { Category } from '../entities/Category';
import { BookCategory } from '../types/category.types.d';
import { AppDataSource } from '../config/dataSource.config';
import { BaseDao } from './Base.dao';
import { Like } from 'typeorm';

export class BookDao implements BaseDao<Book> {
  async findAll(page?: number, pageSize?: number): Promise<{ data: Book[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [books, total] = await Book.findAndCount({
      relations: ['authors', 'categories', 'reviews'],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: books, total };
  }

  async findById(id: string): Promise<Book | null> {
    return Book.findOne({ where: { id }, relations: ['authors', 'categories', 'reviews'] });
  }

  async findByIsbn(isbn: string) {
    return Book.findOne({ where: { isbn } });
  }

  async searchByTitleOrAuthor(q: string, page?: number, pageSize?: number): Promise<{ data: Book[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [books, total] = await Book.findAndCount({
      relations: ['authors', 'categories', 'reviews'],
      where: q.trim().length > 0 ? [{ title: Like(`%${q}%`) }, { authors: { name: Like(`%${q}%`) } }] : undefined,
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: books, total };
  }

  async create(book: Book): Promise<Book> {
    // no duplicate check because the only unique column in Book is the id and that can't be duplicated since it's auto-generated and is a PK.
    return book.save();
  }

  async createBook(book: Book, authorNames: string[], categoryNames: BookCategory[]): Promise<Book> {
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

      const categories = await Promise.all(
        categoryNames.map(async (name) => {
          let category = await transactionalEntityManager.findOne(Category, { where: { name } });

          if (!category) {
            category = transactionalEntityManager.create(Category, { name });
            await transactionalEntityManager.save(category);
          }

          return category;
        }),
      );

      const newBook = transactionalEntityManager.create(Book, {
        ...book,
        authors,
        categories,
      });

      return transactionalEntityManager.save(newBook);
    });

    return createdBook;
  }

  async update(id: string, book: Partial<Book>): Promise<Book | null> {
    const existingBook = await Book.findOneBy({ id });

    if (!existingBook) return null;

    Object.assign(existingBook, book);
    return existingBook.save();
  }

  async delete(id: string): Promise<Book | null> {
    const existingBook = await Book.findOneBy({ id });

    if (!existingBook) return null;

    return Book.remove(existingBook);
  }
}
