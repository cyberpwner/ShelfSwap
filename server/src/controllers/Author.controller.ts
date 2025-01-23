import { RequestHandler } from 'express';
import { AuthorService } from '../services/Author.service';
import { Author } from '../entities/Author';
import { HttpStatusCode } from '../types/http.types.d';

export class AuthorController {
  private readonly authorService = new AuthorService();

  getAllAuthors: RequestHandler = async (req, res) => {
    try {
      const authors = await this.authorService.getAllAuthors();

      res.status(HttpStatusCode.OK).json(authors);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch authors', error: error instanceof Error ? error.message : error });
    }
  };

  getAuthorById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const author = await this.authorService.getAuthorById(id);

      if (author == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(author);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch author', error: error instanceof Error ? error.message : error });
    }
  };

  createAuthor: RequestHandler = async (req, res) => {
    try {
      const author = new Author();
      Object.assign(author, req.body);

      const createdAuthor = await this.authorService.createAuthor(author);

      if (createdAuthor == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Author could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdAuthor);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create author', error: error instanceof Error ? error.message : error });
    }
  };

  updateAuthor: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const author = new Author();
      Object.assign(author, req.body);

      const updatedAuthor = await this.authorService.updateAuthor(id, author);

      if (updatedAuthor == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedAuthor);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update author', error: error instanceof Error ? error.message : error });
    }
  };

  deleteAuthor: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedAuthor = await this.authorService.deleteAuthor(id);

      if (deletedAuthor == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Author not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedAuthor);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete author', error: error instanceof Error ? error.message : error });
    }
  };
}
