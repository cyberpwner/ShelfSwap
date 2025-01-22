import { z } from 'zod';
import { ResponseError } from '../utils/error.utils';
import { RequestHandler, Response } from 'express';
import { TypedRequestBody } from '../types/express.types';
import { authorSchema, CreateAuthorDto, UpdateAuthorDto } from '../schemas/author.schemas';

export class AuthorValidation implements ResponseError {
  validateCreateAuthor: RequestHandler = (req: TypedRequestBody<CreateAuthorDto>, res, next) => {
    try {
      req.body = authorSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateAuthor: RequestHandler = (req: TypedRequestBody<UpdateAuthorDto>, res, next) => {
    // uses the create method cause author only has the name property so there's no difference for now.
    this.validateCreateAuthor(req, res, next);
  };

  handleErrorResponse(error: unknown, res: Response): void {
    if (error instanceof z.ZodError) {
      res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      return;
    }

    res.status(500).json({ message: 'Internal server error.' });
  }
}
