import { BookDto } from './Book.dto';
import { CartDto } from './Cart.dto';

export class CartItemDto {
  id: string;
  cart: CartDto;
  book: BookDto;
  quantity: number;
}
