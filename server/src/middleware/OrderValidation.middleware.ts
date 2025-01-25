import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateOrderDto, createOrderSchema, UpdateOrderDto, updateOrderSchema } from '../schemas/order.schemas';
import { ValidationErrorHandler } from '../utils/error.utils';
import { userSchema } from '../schemas/user.schemas';

export class OrderValidation {
  validateCreateOrder: RequestHandler = (req: TypedRequestBody<CreateOrderDto>, res, next) => {
    try {
      req.body = createOrderSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateOrder: RequestHandler = (req: TypedRequestBody<UpdateOrderDto>, res, next) => {
    try {
      req.body = updateOrderSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateGetbyUser: RequestHandler = (req, res, next) => {
    try {
      req.params.username = userSchema.shape.username.parse(req.params.username);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
