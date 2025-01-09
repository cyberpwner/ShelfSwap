/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Category } from '../entity/Category';
import { BookDto } from './BookDto';

export class CategoryDto {
  name: string;
  books?: BookDto[];

  constructor(category: Partial<Category>) {
    this.name = category.name!;
    this.books = category?.books?.map((book) => new BookDto(book));
  }
}
