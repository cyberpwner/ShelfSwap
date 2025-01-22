import { ValidationErrorHandler } from '../utils/error.utils';
import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { authorSchema, CreateAuthorDto, UpdateAuthorDto } from '../schemas/author.schemas';

export class AuthorValidation {
  validateCreateAuthor: RequestHandler = (req: TypedRequestBody<CreateAuthorDto>, res, next) => {
    try {
      req.body = authorSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateAuthor: RequestHandler = (req: TypedRequestBody<UpdateAuthorDto>, res, next) => {
    // uses the create method cause author only has the name property so there's no difference for now.
    this.validateCreateAuthor(req, res, next);
  };
}
