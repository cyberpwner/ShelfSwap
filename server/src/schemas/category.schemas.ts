import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().nonempty().max(100),
});

export type CreateCategoryDto = z.infer<typeof categorySchema>;
export type UpdateCategoryDto = CreateCategoryDto;
