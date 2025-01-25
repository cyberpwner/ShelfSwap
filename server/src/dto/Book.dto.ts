import { AuthorDto } from './Author.dto';
import { CategoryDto } from './Category.dto';

export class BookDto {
  id: string;
  isbn: string;
  title: string;
  description?: string;
  price: number;
  authors?: AuthorDto[];
  categories?: CategoryDto[];
}
