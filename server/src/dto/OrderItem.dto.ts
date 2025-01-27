import { BookDto } from './Book.dto';
import { OrderDto } from './Order.dto';

export class OrderItemDto {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  book?: BookDto;
  orderId?: string;
  order?: OrderDto;
}
