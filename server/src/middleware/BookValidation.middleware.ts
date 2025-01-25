import { RequestHandler } from 'express';
import {
  CreateBookDto,
  createBookSchema,
  searchQuerySchema,
  UpdateBookDto,
  updateBookSchema,
} from '../schemas/book.schemas';
import { TypedRequestBody } from '../types/express.types.d';
import { ValidationErrorHandler } from '../utils/error.utils';

export class BookValidation {
  validateSearch: RequestHandler = (req, res, next) => {
    try {
      req.query = searchQuerySchema.parse(req.query);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateCreateBook: RequestHandler = (req: TypedRequestBody<CreateBookDto>, res, next) => {
    try {
      req.body = createBookSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateBook: RequestHandler = (req: TypedRequestBody<UpdateBookDto>, res, next) => {
    try {
      req.body = updateBookSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
