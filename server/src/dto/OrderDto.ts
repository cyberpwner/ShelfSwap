/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Order } from '../entity/Order';
import { OrderStatus } from '../types/orderTypes';
import { UserDto } from './UserDto';

export class OrderDto {
  status: OrderStatus;
  trackingNumber?: string;
  buyer: UserDto;

  constructor(order: Partial<Order>) {
    this.status = order.status!;
    this.trackingNumber = order?.trackingNumber;
    this.buyer = new UserDto(order.buyer!);
  }
}
