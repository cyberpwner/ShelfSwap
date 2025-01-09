/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Book } from '../entity/Book';
import { BookCondition } from '../types/bookTypes';
import { UserDto } from './UserDto';

export class BookDto {
  title: string;
  author: string;
  description?: string;
  price: number;
  isSold: boolean;
  condition: BookCondition;
  user: UserDto;

  constructor(book: Partial<Book>) {
    this.title = book.title!;
    this.author = book.author!;
    this.description = book?.description;
    this.price = book.price!;
    this.isSold = book.isSold!;
    this.condition = book.condition!;
    this.user = new UserDto(book.user!);
  }
}
