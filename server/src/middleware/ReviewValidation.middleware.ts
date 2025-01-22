import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateReviewDto, reviewSchema, UpdateReviewDto, updateReviewSchema } from '../schemas/review.schemas';
import { ValidationErrorHandler } from '../utils/error.utils';

export class ReviewValidation {
  validateCreateReview: RequestHandler = (req: TypedRequestBody<CreateReviewDto>, res, next) => {
    try {
      req.body = reviewSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateReview: RequestHandler = (req: TypedRequestBody<UpdateReviewDto>, res, next) => {
    try {
      req.body = updateReviewSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
