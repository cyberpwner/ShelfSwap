import { BookDto } from './Book.dto';
import { CartDto } from './Cart.dto';

export class CartItemDto {
  id: string;
  book: BookDto;
  quantity: number;
  cartId?: string;
  cart?: CartDto;
  createdAt: Date;
}
