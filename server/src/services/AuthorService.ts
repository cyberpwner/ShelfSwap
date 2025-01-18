import { AuthorDao } from '../dao/AuthorDao';
import { AuthorDto } from '../dto/AuthorDto';
import { Author } from '../entity/Author';
import { MapperService } from './MapperService';

export class AuthorService {
  private readonly authorDao: AuthorDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.authorDao = new AuthorDao();
    this.mapperService = new MapperService();
  }

  async getAllAuthors(): Promise<AuthorDto[]> {
    const authors = await this.authorDao.findAll();

    if (authors.length === 0) return [];

    return authors.map((author) => this.mapperService.mapAuthorToDto(author));
  }

  async getAuthorById(id: number): Promise<AuthorDto | null> {
    const author = await this.authorDao.findById(id);

    if (!author) return null;

    return this.mapperService.mapAuthorToDto(author);
  }

  async createAuthor(author: Author): Promise<AuthorDto | null> {
    const createdAuthor = await this.authorDao.create(author);

    if (!createdAuthor) return null;

    return this.mapperService.mapAuthorToDto(createdAuthor);
  }

  async updateAuthor(id: number, author: Partial<Author>): Promise<AuthorDto | null> {
    const updatedAuthor = await this.authorDao.update(id, author);

    if (!updatedAuthor) return null;

    return this.mapperService.mapAuthorToDto(updatedAuthor);
  }

  async deleteAuthor(id: number): Promise<AuthorDto | null> {
    const deletedAuthor = await this.authorDao.delete(id);

    if (!deletedAuthor) return null;

    return this.mapperService.mapAuthorToDto(deletedAuthor);
  }
}
