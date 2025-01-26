import { z } from 'zod';

export const addItemToCartSchema = z.object({
  bookId: z.string().uuid().nonempty(),
  quantity: z.number().int().positive(),
});

export const updateItemQuantity = z.object({
  quantity: addItemToCartSchema.shape.quantity,
});

export type AddItemToCartDto = z.infer<typeof addItemToCartSchema>;
export type UpdateItemQuantityDto = Pick<AddItemToCartDto, 'quantity'>;
