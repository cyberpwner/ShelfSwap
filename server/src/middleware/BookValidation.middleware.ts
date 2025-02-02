import { RequestHandler } from 'express';
import {
  CreateBookDto,
  createBookSchema,
  UpdateBookDto,
  updateBookSchema,
} from '../schemas/book.schemas';
import { TypedRequestBody } from '../types/express.types.d';
import { ValidationErrorHandler } from '../utils/error.utils';

export class BookValidation {
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
