import { AuthorDto } from './AuthorDto';
import { CategoryDto } from './CategoryDto';

export class BookDto {
  isbn: string;
  title: string;
  description?: string;
  price: number;
  authors?: AuthorDto[];
  categories?: CategoryDto[];
}
