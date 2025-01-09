/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Review } from '../entity/Review';
import { ReviewRating, ReviewType } from '../types/reviewTypes';
import { OrderDto } from './OrderDto';

export class ReviewDto {
  type: ReviewType;
  rating: ReviewRating;
  comment?: string;
  order: OrderDto;

  constructor(review: Partial<Review>) {
    this.type = review.type!;
    this.rating = review.rating!;
    this.comment = review?.comment;
    this.order = new OrderDto(review.order!);
  }
}
