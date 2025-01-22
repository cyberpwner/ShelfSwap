import { RequestHandler, Response } from 'express';
import { TypedRequestBody } from '../types/express.types';
import { CreateReviewDto, reviewSchema, UpdateReviewDto, updateReviewSchema } from '../schemas/review.schemas';
import { z } from 'zod';
import { ResponseError } from '../utils/error.utils';

export class ReviewValidation implements ResponseError {
  validateCreateReview: RequestHandler = (req: TypedRequestBody<CreateReviewDto>, res, next) => {
    try {
      req.body = reviewSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateReview: RequestHandler = (req: TypedRequestBody<UpdateReviewDto>, res, next) => {
    try {
      req.body = updateReviewSchema.parse(req.body);

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
