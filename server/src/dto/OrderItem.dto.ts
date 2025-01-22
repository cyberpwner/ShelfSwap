import { BookDto } from './Book.dto';

export class OrderItemDto {
  quantity: number;
  priceAtPurchase: number;
  book?: BookDto;
  orderId?: number;
}
