import { RequestHandler } from 'express';
import { AuthorService } from '../services/Author.service';
import { Author } from '../entities/Author';
import { HttpStatusCode } from '../types/http.types.d';
import { TypedRequestBody } from '../types/express.types';
import { UpdateAuthorDto } from '../schemas/author.schemas';

export class AuthorController {
  private readonly authorService = new AuthorService();

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = '1';
    }

    const decodedPageNum = Number(decodeURIComponent(String(pageNum)));

    try {
      const { data, page, total, totalPages } = await this.authorService.getAll(decodedPageNum);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch authors' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const author = await this.authorService.getById(id);

      if (author == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(author);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch author' });
    }
  };

  createAuthor: RequestHandler = async (req, res) => {
    try {
      const author = new Author();
      Object.assign(author, req.body);

      const createdAuthor = await this.authorService.createAuthor(author);

      if (createdAuthor == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Author could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdAuthor);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create author' });
    }
  };

  updateAuthor: RequestHandler = async (req: TypedRequestBody<UpdateAuthorDto>, res) => {
    try {
      const id = req.params.id;
      const author = new Author();
      Object.assign(author, req.body);

      const updatedAuthor = await this.authorService.updateAuthor(id, author);

      if (updatedAuthor == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedAuthor);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update author' });
    }
  };

  deleteAuthor: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedAuthor = await this.authorService.deleteAuthor(id);

      if (deletedAuthor == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedAuthor);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete author' });
    }
  };
}
