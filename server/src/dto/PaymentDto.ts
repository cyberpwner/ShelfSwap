/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Payment } from '../entity/Payment';
import { PaymentMethod } from '../types/paymentTypes';
import { OrderDto } from './OrderDto';

export class PaymentDto {
  method: PaymentMethod;
  amount: number;
  order: OrderDto;

  constructor(payment: Partial<Payment>) {
    this.method = payment.method!;
    this.amount = payment.amount!;
    this.order = new OrderDto(payment.order!);
  }
}
