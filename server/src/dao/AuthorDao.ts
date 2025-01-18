import { Author } from '../entity/Author';
import { BaseDao } from './BaseDao';

export class AuthorDao implements BaseDao<Author> {
  async findAll(): Promise<Author[]> {
    return Author.find({ relations: ['books'] });
  }

  async findById(id: number): Promise<Author | null> {
    return Author.findOne({ where: { id }, relations: ['books'] });
  }

  async create(author: Author): Promise<Author> {
    return author.save();
  }

  async update(id: number, author: Partial<Author>): Promise<Author | null> {
    const existingAuthor = await Author.findOneBy({ id });

    if (!existingAuthor) return null;

    Object.assign(existingAuthor, author);
    return existingAuthor.save();
  }

  async delete(id: number): Promise<Author | null> {
    const existingAuthor = await Author.findOneBy({ id });

    if (!existingAuthor) return null;

    return Author.remove(existingAuthor);
  }
}
