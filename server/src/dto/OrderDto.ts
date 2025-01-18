import { OrderStatus } from '../types/orderTypes';
import { OrderItemDto } from './OrderItemDto';
import { UserDto } from './UserDto';

export class OrderDto {
  status: OrderStatus;
  trackingNumber?: string;
  user: UserDto;
  items?: OrderItemDto[];
}
