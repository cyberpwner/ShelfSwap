/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Review } from '../entity/Review';
import { ReviewRating } from '../types/reviewTypes';
import { OrderDto } from './OrderDto';

export class ReviewDto {
  rating: ReviewRating;
  comment?: string;
  order: OrderDto;

  constructor(review: Partial<Review>) {
    this.rating = review.rating!;
    this.comment = review?.comment;
    this.order = new OrderDto(review.order!);
  }
}
