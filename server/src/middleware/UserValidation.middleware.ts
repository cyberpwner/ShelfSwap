import { RequestHandler, Response } from 'express';
import { CreateUserDto, createUserSchema, UpdateUserDto, updateUserSchema } from '../schemas/user.schemas';
import { TypedRequestBody } from '../types/express.types.d';
import { ValidationErrorHandler } from '../utils/error.utils';

export class UserValidation {
  validateCreateUser: RequestHandler = (req: TypedRequestBody<CreateUserDto>, res, next) => {
    try {
      req.body = createUserSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateUser: RequestHandler = (req: TypedRequestBody<UpdateUserDto>, res, next) => {
    try {
      req.body = updateUserSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  handleErrorResponse(error: unknown, res: Response): void {
    ValidationErrorHandler.handleZodError(error, res);
  }
}
