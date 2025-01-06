import { Review } from '../entity/Review';
import { BaseDao } from './BaseDao';

export class ReviewDao implements BaseDao<Review> {
  async findAll(): Promise<Review[]> {
    return Review.find();
  }

  async findById(id: number): Promise<Review | null> {
    return Review.findOne({ where: { id } });
  }

  async create(review: Review): Promise<Review | null> {
    return review.save();
  }

  async update(id: number, review: Partial<Review>): Promise<Review | null> {
    const existingReview = await Review.findOne({ where: { id } });

    if (!existingReview) return null;

    Object.assign(existingReview, review);
    return existingReview.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingReview = await Review.findOneBy({ id });

    if (!existingReview) return false;

    await Review.remove(existingReview);
    return true;
  }
}
