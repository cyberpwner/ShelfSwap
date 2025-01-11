/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Author } from '../entity/Author';
import { BookDto } from './BookDto';

export class AuthorDto {
  name: string;
  books?: BookDto[];

  constructor(author: Partial<Author>) {
    this.name = author.name!;
    this.books = author?.books?.map((book) => new BookDto(book));
  }
}
