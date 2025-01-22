import { BookDto } from './Book.dto';

export class AuthorDto {
  name: string;
  books?: BookDto[];
}
