import { z } from 'zod';
import { ReviewRating } from '../types/review.types.d';
import { idSchema } from './common.schemas';

export const reviewSchema = z.object({
  rating: z.nativeEnum(ReviewRating),
  comment: z.string().trim().nonempty().max(255).optional(),
  bookId: idSchema,
  userId: idSchema,
});

export const updateReviewSchema = reviewSchema.partial().refine((review) => Object.keys(review).length > 0, {
  message: 'At least one review field must be introduced in order to update it',
});

export type CreateReviewDto = z.infer<typeof reviewSchema>;
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;
