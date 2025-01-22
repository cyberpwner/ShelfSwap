import { z } from 'zod';

export const authorSchema = z.object({
  name: z.string().trim().nonempty().max(100),
});

export type CreateAuthorDto = z.infer<typeof authorSchema>;
export type UpdateAuthorDto = CreateAuthorDto;
