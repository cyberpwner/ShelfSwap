import { BookDto } from './BookDto';

export class OrderItemDto {
  quantity: number;
  priceAtPurchase: number;
  book?: BookDto;
  orderId?: number;
}
