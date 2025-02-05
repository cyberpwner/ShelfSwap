import { AuthorDto } from './Author.dto';
import { CategoryDto } from './Category.dto';

export class BookDto {
  id: string;
  isbn: string;
  title: string;
  description?: string;
  price: number;
  coverUrl: string;
  authors?: AuthorDto[];
  categories?: CategoryDto[];
  createdAt: Date;
}
