export enum ReviewType {
  SELLER_TO_BUYER = 'seller_to_buyer',
  BUYER_TO_SELLER = 'buyer_to_seller',
}

// five stars rating range, each value represents number of stars
export enum ReviewRating {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export interface IReview {
  type: ReviewType;
  rating: ReviewRating;
  comment?: string;
  orderId: number;
}
