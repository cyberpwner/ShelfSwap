import { UserRole } from '@/types/user.types';
import { z } from 'zod';

const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/);

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username must be 50 characters or less' }),
  email: z.string().trim().email({ message: 'Please enter a valid email' }).nonempty().max(100),
  password: z.string().trim().regex(passwordRegex, {
    message:
      'Password must be of length [8-50], must have at least 1 big letter, 1 small letter, 1 digit, 1 of these special characters: #?!@$%^&*-',
  }),
});

export const createUserSchema = registerSchema.extend({
  role: z.nativeEnum(UserRole),
});

export const loginSchema = z.object({
  email: registerSchema.shape.email,
  password: registerSchema.shape.password,
});
