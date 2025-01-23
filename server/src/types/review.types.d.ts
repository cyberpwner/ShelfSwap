// five stars rating range, each value represents number of stars
export enum ReviewRating {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export interface IReview {
  rating: ReviewRating;
  comment?: string;
  orderId: string;
}
