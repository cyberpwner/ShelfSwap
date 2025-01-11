import { OrderStatus } from '../types/orderTypes';

export class CreateOrderDto {
  status: OrderStatus;
  trackingNumber?: string;
  buyer: number;
}
