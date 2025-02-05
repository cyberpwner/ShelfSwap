import { BookDto } from './Book.dto';

export class CategoryDto {
  id: string;
  name: string;
  books?: BookDto[];
  createdAt: Date;
}
