import { z } from 'zod';
import { UserRole } from '../types/user.types.d';

// at least 1 big letter, 1 small letter, 1 digit, 1 special character. Min: 8, Max: 50
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/);

export const userSchema = z.object({
  username: z.string().trim().min(3).max(50),
  email: z.string().trim().email().nonempty().max(100),
  password: z.string().trim().regex(passwordRegex, {
    message:
      'Password must have at least 1 big letter, 1 small letter, 1 digit, 1 special character. Min length: 8. Max length: 50',
  }),
  role: z.nativeEnum(UserRole),
  bio: z.string().trim().nonempty().max(150).optional(),
  avatarUrl: z.string().trim().url().nonempty().max(2048).optional(),
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one user field must be introduced' });

export const loginUserSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;
