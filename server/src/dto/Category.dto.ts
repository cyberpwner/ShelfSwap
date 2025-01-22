import { BookDto } from './Book.dto';

export class CategoryDto {
  name: string;
  books?: BookDto[];
}
