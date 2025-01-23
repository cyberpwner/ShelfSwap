import { RequestHandler, Response } from 'express';
import {
  CreateUserDto,
  createUserSchema,
  LoginUserDto,
  loginUserSchema,
  UpdateUserDto,
  updateUserSchema,
} from '../schemas/user.schemas';
import { TypedRequestBody } from '../types/express.types.d';
import { ValidationErrorHandler } from '../utils/error.utils';

export class UserValidation {
  validateRegister: RequestHandler = (req: TypedRequestBody<CreateUserDto>, res, next) => {
    try {
      req.body = createUserSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateLogin: RequestHandler = (req: TypedRequestBody<LoginUserDto>, res, next) => {
    try {
      req.body = loginUserSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdate: RequestHandler = (req: TypedRequestBody<UpdateUserDto>, res, next) => {
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
