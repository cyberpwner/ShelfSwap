import { PaymentMethod } from '../types/payment.types.d';
import { OrderDto } from './Order.dto';

export class PaymentDto {
  id: string;
  method: PaymentMethod;
  amount: number;
  order: OrderDto;
  createdAt: Date;
}
