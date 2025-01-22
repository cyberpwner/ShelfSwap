import { RequestHandler } from 'express';
import { z } from 'zod';
import { CreateBookDto, createBookSchema, searchQuerySchema, UpdateBookDto, updateBookSchema } from '../schemas/book.schemas';
import { TypedRequestBody } from '../types/express.types';

export class BookValidation {
  validateSearch: RequestHandler = (req, res, next) => {
    try {
      req.query = searchQuerySchema.parse(req.query);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      }
    }
  };

  validateCreateBook: RequestHandler = (req: TypedRequestBody<CreateBookDto>, res, next) => {
    try {
      req.body = createBookSchema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      }
    }
  };

  validateUpdateBook: RequestHandler = (req: TypedRequestBody<UpdateBookDto>, res, next) => {
    try {
      req.body = updateBookSchema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      }
    }
  };
}
