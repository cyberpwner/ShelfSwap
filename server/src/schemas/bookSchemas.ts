import { z } from 'zod';
import { validateISBN } from '../utils/bookUtils';
import { BookCategory } from '../types/categoryTypes.d.js';

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

export type CreateBookDto = z.infer<typeof createBookSchema>;
