/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderItem } from '../entity/OrderItem';
import { BookDto } from './BookDto';
import { OrderDto } from './OrderDto';

export class OrderItemDto {
  quantity: number;
  priceAtPurchase: number;
  order: OrderDto;
  book: BookDto;

  constructor(orderItem: Partial<OrderItem>) {
    this.quantity = orderItem.quantity!;
    this.priceAtPurchase = orderItem.priceAtPurchase!;
    this.order = new OrderDto(orderItem.order!);
    this.book = new BookDto(orderItem.book!);
  }
}
