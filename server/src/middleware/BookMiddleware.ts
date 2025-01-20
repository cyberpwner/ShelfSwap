import { RequestHandler } from 'express';
import { z } from 'zod';
import { idSchema } from '../schemas/commonSchemas';
import { bookSchema, CreateBookDto, createBookSchema } from '../schemas/bookSchemas';

export class BookMiddleWare {
  validateSearch: RequestHandler = (req, res, next) => {
    const searchQuerySchema = z.object({
      q: z
        .string()
        .nonempty()
        .max(255)
        .transform((val) => val.trim()),
    });

    try {
      req.query = searchQuerySchema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
        return;
      }
    }
  };

  validateId: RequestHandler = (req, res, next) => {
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

  validateNewBook: RequestHandler = (req, res, next) => {
    try {
      const validatedData: CreateBookDto = createBookSchema.parse(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
        return;
      }
    }
  };

  validateUpdatedBook: RequestHandler = (req, res, next) => {
    try {
      const validatedData = bookSchema
        .partial()
        .refine((data) => Object.keys(data).length > 0, { message: 'At least one field (title, author, price or isbn) must be provided' })
        .parse(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
        return;
      }
    }
  };
}
