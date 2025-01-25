/* eslint-disable @typescript-eslint/no-extraneous-class */
import { RequestHandler } from 'express';
import { idSchema } from '../schemas/common.schemas';
import { ValidationErrorHandler } from '../utils/error.utils';

export class CommonValidation {
  static validateId: RequestHandler = (req, res, next) => {
    try {
      req.params.id = idSchema.parse(req.params.id);
      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
