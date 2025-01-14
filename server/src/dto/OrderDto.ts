/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Order } from '../entity/Order';
import { OrderStatus } from '../types/orderTypes';
import { OrderItemDto } from './OrderItemDto';
import { UserDto } from './UserDto';

export class OrderDto {
  status: OrderStatus;
  trackingNumber?: string;
  user: UserDto;
  items?: OrderItemDto[];

  constructor(order: Partial<Order>) {
    this.status = order.status!;
    this.trackingNumber = order?.trackingNumber;
    this.user = new UserDto(order.user!);
    this.items = order?.items?.map((item) => new OrderItemDto(item));
  }
}
