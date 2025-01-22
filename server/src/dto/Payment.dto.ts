import { PaymentMethod } from '../types/payment.types';
import { OrderDto } from './Order.dto';

export class PaymentDto {
  method: PaymentMethod;
  amount: number;
  order: OrderDto;
}
