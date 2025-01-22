import { ReviewRating } from '../types/review.types.d';
import { BookDto } from './Book.dto';

export class ReviewDto {
  rating: ReviewRating;
  comment?: string;
  book: BookDto;
}
