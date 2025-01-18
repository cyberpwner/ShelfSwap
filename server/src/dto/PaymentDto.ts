import { PaymentMethod } from '../types/paymentTypes';
import { OrderDto } from './OrderDto';

export class PaymentDto {
  method: PaymentMethod;
  amount: number;
  order: OrderDto;
}
