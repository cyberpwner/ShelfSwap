import { BookDto } from './Book.dto';

export class AuthorDto {
  id: string;
  name: string;
  books?: BookDto[];
  createdAt: Date;
}
