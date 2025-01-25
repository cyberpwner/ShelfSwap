import { ValidationErrorHandler } from '../utils/error.utils';
import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { categorySchema, CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schemas';

export class CategoryValidation {
  validateCreateCategory: RequestHandler = (req: TypedRequestBody<CreateCategoryDto>, res, next) => {
    try {
      req.body = categorySchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateCategory: RequestHandler = (req: TypedRequestBody<UpdateCategoryDto>, res, next) => {
    // uses the create method cause category only has the name property so there's no difference for now.
    this.validateCreateCategory(req, res, next);
  };
}
