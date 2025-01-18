import { ReviewRating } from '../types/reviewTypes';
import { BookDto } from './BookDto';

export class ReviewDto {
  rating: ReviewRating;
  comment?: string;
  book: BookDto;
}
