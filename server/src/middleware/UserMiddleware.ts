import { RequestHandler } from 'express';
import { CreateUserDto, createUserSchema, UpdateUserDto, updateUserSchema } from '../schemas/userSchemas';
import { z } from 'zod';
import { TypedRequestBody } from '../types/expressTypes';

export class UserMiddleware {
  validateCreateUser: RequestHandler = (req: TypedRequestBody<CreateUserDto>, res, next) => {
    try {
      req.body = createUserSchema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error.flatten().fieldErrors);
        return;
      }

      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  validateUpdateUser: RequestHandler = (req: TypedRequestBody<UpdateUserDto>, res, next) => {
    try {
      req.body = updateUserSchema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error.flatten().fieldErrors);
      }
    }
  };
}
