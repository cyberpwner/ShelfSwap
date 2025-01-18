import { BookDto } from './BookDto';

export class AuthorDto {
  name: string;
  books?: BookDto[];
}
