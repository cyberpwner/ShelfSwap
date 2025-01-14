import { AuthorDao } from '../dao/AuthorDao';
import { AuthorDto } from '../dto/AuthorDto';
import { Author } from '../entity/Author';

export class AuthorService {
  private readonly authorDao: AuthorDao;

  constructor() {
    this.authorDao = new AuthorDao();
  }

  async getAllAuthors(): Promise<AuthorDto[]> {
    const authors = await this.authorDao.findAll();

    if (authors.length === 0) return [];

    return authors.map((author) => new AuthorDto(author));
  }

  async getAuthorById(id: number): Promise<AuthorDto | null> {
    const author = await this.authorDao.findById(id);

    if (!author) return null;

    return new AuthorDto(author);
  }

  async createAuthor(author: Author): Promise<AuthorDto | null> {
    const createdAuthor = await this.authorDao.create(author);

    if (!createdAuthor) return null;

    return new AuthorDto(createdAuthor);
  }

  async updateAuthor(id: number, author: Partial<Author>): Promise<AuthorDto | null> {
    const updatedAuthor = await this.authorDao.update(id, author);

    if (!updatedAuthor) return null;

    return new AuthorDto(updatedAuthor);
  }

  async deleteAuthor(id: number): Promise<AuthorDto | null> {
    const deletedAuthor = await this.authorDao.delete(id);

    if (!deletedAuthor) return null;

    return new AuthorDto(deletedAuthor);
  }
}
