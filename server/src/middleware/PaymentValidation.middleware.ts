import { RequestHandler, Response } from 'express';
import { TypedRequestBody } from '../types/express.types';
import { CreatePaymentDto, paymentSchema, UpdatePaymentDto, updatePaymentSchema } from '../schemas/payment.schemas';
import { z } from 'zod';
import { ResponseError } from '../utils/error.utils';

export class PaymentValidation implements ResponseError {
  validateCreatePayment: RequestHandler = (req: TypedRequestBody<CreatePaymentDto>, res, next) => {
    try {
      req.body = paymentSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdatePayment: RequestHandler = (req: TypedRequestBody<UpdatePaymentDto>, res, next) => {
    try {
      req.body = updatePaymentSchema.parse(req.body);

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
