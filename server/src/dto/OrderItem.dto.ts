import { BookDto } from './Book.dto';

export class OrderItemDto {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  book?: BookDto;
  orderId?: string;
}
