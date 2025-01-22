import { RequestHandler, Response } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { CreateOrderDto, createOrderSchema, UpdateOrderDto, updateOrderSchema } from '../schemas/order.schemas';
import { z } from 'zod';
import { ResponseError } from '../utils/error.utils';
import { userSchema } from '../schemas/user.schemas';

export class OrderValidation implements ResponseError {
  validateCreateOrder: RequestHandler = (req: TypedRequestBody<CreateOrderDto>, res, next) => {
    try {
      req.body = createOrderSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateOrder: RequestHandler = (req: TypedRequestBody<UpdateOrderDto>, res, next) => {
    try {
      req.body = updateOrderSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateGetbyUser: RequestHandler = (req, res, next) => {
    try {
      req.params.username = userSchema.shape.username.parse(req.params.username);

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
