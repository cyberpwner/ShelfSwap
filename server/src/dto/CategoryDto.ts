import { BookDto } from './BookDto';

export class CategoryDto {
  name: string;
  books?: BookDto[];
}
