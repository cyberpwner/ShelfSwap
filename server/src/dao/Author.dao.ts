import { Author } from '../entities/Author';
import { BaseDao } from './Base.dao';

type AuthorRelations = 'books';

export class AuthorDao implements BaseDao<Author> {
  async findAll(page?: number, pageSize?: number): Promise<{ data: Author[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [authors, total] = await Author.findAndCount({
      relations: ['books'] as AuthorRelations[],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: authors, total };
  }

  async findById(id: string): Promise<Author | null> {
    return Author.findOne({ where: { id }, relations: ['books'] as AuthorRelations[] });
  }

  async create(author: Author): Promise<Author> {
    return author.save();
  }

  async update(id: string, author: Partial<Author>): Promise<Author | null> {
    const existingAuthor = await Author.findOneBy({ id });

    if (!existingAuthor) return null;

    Object.assign(existingAuthor, author);
    return existingAuthor.save();
  }

  async delete(id: string): Promise<Author | null> {
    const existingAuthor = await Author.findOneBy({ id });

    if (!existingAuthor) return null;

    return Author.remove(existingAuthor);
  }
}
