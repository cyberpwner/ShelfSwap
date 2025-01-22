import { z } from 'zod';
import { validateISBN } from '../utils/book.utils';
import { BookCategory } from '../types/category.types.js';

export const searchQuerySchema = z.object({
  q: z
    .string()
    .nonempty()
    .max(255)
    .transform((val) => val.trim()),
});

export const isbnSchema = z
  .string()
  .max(13)
  .refine((value) => validateISBN(value));

export const bookSchema = z.object({
  isbn: isbnSchema,
  title: z.string().nonempty().max(100),
  description: z.string().nonempty().max(255).optional(),
  price: z.number().gt(0).lt(1000),
});

export const authorSchema = z.object({
  name: z.string().nonempty().max(100),
});

export const categorySchema = z.object({
  name: z.nativeEnum(BookCategory),
});

export const createBookSchema = z.object({
  book: bookSchema,
  authors: z.array(authorSchema.shape.name).nonempty(),
  categories: z.array(categorySchema.shape.name).nonempty(),
});

export const updateBookSchema = bookSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'A least one book field must be introduced' });

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
