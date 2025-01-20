/* eslint-disable @typescript-eslint/no-extraneous-class */
import { RequestHandler } from 'express';
import { idSchema } from '../schemas/commonSchemas';
import { z } from 'zod';

export class CommonMiddleware {
  static validateId: RequestHandler = (req, res, next) => {
    try {
      req.params.id = String(idSchema.parse(Number(req.params.id)));
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
        return;
      }
    }
  };
}
