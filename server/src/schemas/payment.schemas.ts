import { z } from 'zod';
import { PaymentMethod } from '../types/payment.types.d';
import { idSchema } from './common.schemas';

export const paymentSchema = z.object({
  method: z.nativeEnum(PaymentMethod),
  amount: z.number().positive().finite().gt(0),
  orderId: idSchema,
});

export const updatePaymentSchema = paymentSchema.partial().refine((payment) => Object.keys(payment).length > 0, {
  message: 'At least one payment field must be introduced in order to update it',
});

export type CreatePaymentDto = z.infer<typeof paymentSchema>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>;
