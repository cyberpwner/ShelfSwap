/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Book } from '../entity/Book';
import { AuthorDto } from './AuthorDto';

export class BookDto {
  isbn: string;
  title: string;
  description?: string;
  price: number;
  authors?: AuthorDto[];

  constructor(book: Partial<Book>) {
    this.isbn = book.isbn!;
    this.title = book.title!;
    this.description = book?.description;
    this.price = book.price!;
    this.authors = book?.authors?.map((author) => new AuthorDto(author));
  }
}
