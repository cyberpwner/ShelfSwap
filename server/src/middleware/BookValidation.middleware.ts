import { RequestHandler, Response } from 'express';
import { z } from 'zod';
import { CreateBookDto, createBookSchema, searchQuerySchema, UpdateBookDto, updateBookSchema } from '../schemas/book.schemas';
import { TypedRequestBody } from '../types/express.types.d';
import { ResponseError } from '../utils/error.utils';

export class BookValidation implements ResponseError {
  validateSearch: RequestHandler = (req, res, next) => {
    try {
      req.query = searchQuerySchema.parse(req.query);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateCreateBook: RequestHandler = (req: TypedRequestBody<CreateBookDto>, res, next) => {
    try {
      req.body = createBookSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateBook: RequestHandler = (req: TypedRequestBody<UpdateBookDto>, res, next) => {
    try {
      req.body = updateBookSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  handleErrorResponse(error: unknown, res: Response): void {
    if (error instanceof z.ZodError) {
      res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      return;
    }

    res.status(500).json({ message: 'Internal server error.' });
  }
}
