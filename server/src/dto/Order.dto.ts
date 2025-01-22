import { OrderStatus } from '../types/order.types';
import { OrderItemDto } from './OrderItem.dto';
import { UserDto } from './User.dto';

export class OrderDto {
  status: OrderStatus;
  trackingNumber?: string;
  user: UserDto;
  items?: OrderItemDto[];
}
