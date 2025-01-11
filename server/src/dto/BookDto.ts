/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Book } from '../entity/Book';
import { AuthorDto } from './AuthorDto';

export class BookDto {
  title: string;
  authors?: AuthorDto[];
  description?: string;
  price: number;

  constructor(book: Partial<Book>) {
    this.title = book.title!;
    this.authors = book?.authors?.map((author) => new AuthorDto(author));
    this.description = book?.description;
    this.price = book.price!;
  }
}
