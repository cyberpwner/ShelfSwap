/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Book } from '../entity/Book';
import { AuthorDto } from './AuthorDto';
import { CategoryDto } from './CategoryDto';

export class BookDto {
  isbn: string;
  title: string;
  description?: string;
  price: number;
  authors?: AuthorDto[];
  categories?: CategoryDto[];

  constructor(book: Partial<Book>) {
    this.isbn = book.isbn!;
    this.title = book.title!;
    this.description = book?.description;
    this.price = book.price!;
    this.authors = book?.authors?.map((author) => new AuthorDto(author));
    this.categories = book?.categories?.map((category) => new CategoryDto(category));
  }
}
