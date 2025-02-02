import { z } from 'zod';
import { validateISBN } from '../utils/book.utils';
import { BookCategory } from '../types/category.types.d';
import { authorSchema } from './author.schemas';

export const searchQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
});

export const isbnSchema = z
  .string()
  .trim()
  .max(13)
  .refine((value) => validateISBN(value));

export const bookSchema = z.object({
  isbn: isbnSchema,
  title: z.string().trim().nonempty().max(100),
  price: z.number().gt(0).lt(1000),
  coverUrl: z.string().trim().url().nonempty().max(2048),
  description: z.string().trim().nonempty().max(255).optional(),
});

export const categorySchema = z.object({
  name: z.nativeEnum(BookCategory),
});

export const createBookSchema = z.object({
  book: bookSchema,
  authors: z.array(authorSchema.shape.name).nonempty(),
  categories: z.array(categorySchema.shape.name).nonempty(),
});

export const updateBookSchema = bookSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
  message: 'At least one book field must be introduced in order to update it',
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
