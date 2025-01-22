import { z } from 'zod';
import { UserRole } from '../types/user.types.js';

// at least 1 big letter, 1 small letter, 1 digit, 1 special character. Min: 8, Max: 50
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/);

export const createUserSchema = z.object({
  username: z.string().trim().min(3).max(50),
  email: z.string().email().trim().nonempty().max(100),
  password: z.string().trim().regex(passwordRegex, {
    message: 'Password must have at least 1 big letter, 1 small letter, 1 digit, 1 special character. Min length: 8. Max length: 50',
  }),
  role: z.nativeEnum(UserRole),
  bio: z.string().nonempty().max(150).optional(),
  profilePicUrl: z.string().url().nonempty().max(2048).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one user field must be introduced' });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
