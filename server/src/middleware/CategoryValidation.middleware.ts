import { z } from 'zod';
import { ResponseError } from '../utils/error.utils';
import { RequestHandler, Response } from 'express';
import { TypedRequestBody } from '../types/express.types';
import { categorySchema, CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schemas';

export class CategoryValidation implements ResponseError {
  validateCreateCategory: RequestHandler = (req: TypedRequestBody<CreateCategoryDto>, res, next) => {
    try {
      req.body = categorySchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateCategory: RequestHandler = (req: TypedRequestBody<UpdateCategoryDto>, res, next) => {
    // uses the create method cause category only has the name property so there's no difference for now.
    this.validateCreateCategory(req, res, next);
  };

  handleErrorResponse(error: unknown, res: Response): void {
    if (error instanceof z.ZodError) {
      res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      return;
    }

    res.status(500).json({ message: 'Internal server error.' });
  }
}
