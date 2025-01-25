import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { CreatePaymentDto, paymentSchema, UpdatePaymentDto, updatePaymentSchema } from '../schemas/payment.schemas';
import { ValidationErrorHandler } from '../utils/error.utils';

export class PaymentValidation {
  validateCreatePayment: RequestHandler = (req: TypedRequestBody<CreatePaymentDto>, res, next) => {
    try {
      req.body = paymentSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdatePayment: RequestHandler = (req: TypedRequestBody<UpdatePaymentDto>, res, next) => {
    try {
      req.body = updatePaymentSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
