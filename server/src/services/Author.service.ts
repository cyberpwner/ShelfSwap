import { AuthorDao } from '../dao/Author.dao';
import { AuthorDto } from '../dto/Author.dto';
import { PaginatedDto } from '../dto/Paginated.dto';
import { Author } from '../entities/Author';
import { MapperService } from './Mapper.service';

export class AuthorService {
  private readonly authorDao: AuthorDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.authorDao = new AuthorDao();
    this.mapperService = new MapperService();
  }

  async getAll(page?: number, pageSize?: number): Promise<PaginatedDto<AuthorDto>> {
    const { data: authors, total } = await this.authorDao.findAll(page ?? undefined, pageSize ?? undefined);

    if (authors.length === 0) {
      return {
        data: [],
        total: 0,
        page: 0,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (pageSize && total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: authors.map((author) => this.mapperService.mapAuthorToDto(author)),
      total,
      page: page ?? 1,
      totalPages,
    };
  }

  async getById(id: string): Promise<AuthorDto | null> {
    const author = await this.authorDao.findById(id);

    if (!author) return null;

    return this.mapperService.mapAuthorToDto(author);
  }

  async createAuthor(author: Author): Promise<AuthorDto | null> {
    const createdAuthor = await this.authorDao.create(author);

    if (!createdAuthor) return null;

    return this.mapperService.mapAuthorToDto(createdAuthor);
  }

  async updateAuthor(id: string, author: Partial<Author>): Promise<AuthorDto | null> {
    const updatedAuthor = await this.authorDao.update(id, author);

    if (!updatedAuthor) return null;

    return this.mapperService.mapAuthorToDto(updatedAuthor);
  }

  async deleteAuthor(id: string): Promise<AuthorDto | null> {
    const deletedAuthor = await this.authorDao.delete(id);

    if (!deletedAuthor) return null;

    return this.mapperService.mapAuthorToDto(deletedAuthor);
  }
}
