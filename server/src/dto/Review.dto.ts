import { ReviewRating } from '../types/review.types.d';
import { BookDto } from './Book.dto';

export class ReviewDto {
  id: string;
  rating: ReviewRating;
  comment?: string;
  book: BookDto;
}
