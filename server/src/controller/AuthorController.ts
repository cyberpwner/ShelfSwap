import { RequestHandler } from 'express';
import { AuthorService } from '../services/AuthorService';
import { Author } from '../entity/Author';

export class AuthorController {
  private readonly authorService = new AuthorService();

  getAllAuthors: RequestHandler = async (req, res) => {
    try {
      const authors = await this.authorService.getAllAuthors();

      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch authors', error: error instanceof Error ? error.message : error });
    }
  };

  getAuthorById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const author = await this.authorService.getAuthorById(id);

      if (author == null) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch author', error: error instanceof Error ? error.message : error });
    }
  };

  createAuthor: RequestHandler = async (req, res) => {
    try {
      const author = new Author();
      Object.assign(author, req.body);

      const createdAuthor = await this.authorService.createAuthor(author);

      if (createdAuthor == null) {
        res.status(400).json({ message: 'Author could not be created' });
        return;
      }

      res.status(200).json(createdAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create author', error: error instanceof Error ? error.message : error });
    }
  };

  updateAuthor: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const author = new Author();
      Object.assign(author, req.body);

      const updatedAuthor = await this.authorService.updateAuthor(id, author);

      if (updatedAuthor == null) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.status(200).json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update author', error: error instanceof Error ? error.message : error });
    }
  };

  deleteAuthor: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedAuthor = await this.authorService.deleteAuthor(id);

      if (deletedAuthor == null) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.status(200).json(deletedAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete author', error: error instanceof Error ? error.message : error });
    }
  };
}
