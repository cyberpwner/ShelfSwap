import { RequestHandler, Response } from 'express';
import { CreateUserDto, createUserSchema, UpdateUserDto, updateUserSchema } from '../schemas/user.schemas';
import { z } from 'zod';
import { TypedRequestBody } from '../types/express.types.d';

export class UserValidation {
  validateCreateUser: RequestHandler = (req: TypedRequestBody<CreateUserDto>, res, next) => {
    try {
      req.body = createUserSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateUser: RequestHandler = (req: TypedRequestBody<UpdateUserDto>, res, next) => {
    try {
      req.body = updateUserSchema.parse(req.body);

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
