import { z } from 'zod';
import { idSchema } from './common.schemas';

export const addressSchema = z.object({
  city: z.string().trim().min(3).max(100),
  addressLine1: z.string().trim().min(5).max(150),
  addressLine2: z.string().trim().min(5).max(150).optional(),
  userId: idSchema,
});

export const updateAddressSchema = addressSchema.partial().refine((address) => Object.keys(address).length > 0, {
  message: 'At least one address field must be introduced in order to update it',
});

export type CreateAddressDto = z.infer<typeof addressSchema>;
export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
