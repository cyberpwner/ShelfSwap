import { z } from 'zod';
import { idSchema } from './common.schemas';
import { OrderStatus } from '../types/order.types.d';

export const orderSchema = z.object({
  user: idSchema,
  status: z.nativeEnum(OrderStatus),
  trackingNumber: z.string().trim().uuid().optional(),
});

export const orderItemSchema = z.object({
  quantity: z.number().int().positive().min(1).finite().max(50),
  priceAtPurchase: z.number().positive().finite(),
  book: idSchema,
  order: idSchema,
});

export const createOrderSchema = z.object({
  order: orderSchema,
  items: z.array(orderItemSchema).nonempty(),
});

export const updateOrderSchema = z.object({
  order: orderSchema.partial().refine((o) => Object.keys(o).length > 0, {
    message: 'At least one Order field should be introduced to update it',
  }),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
