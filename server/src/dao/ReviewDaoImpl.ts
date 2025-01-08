import { Review } from '../entity/Review';
import { BaseDao } from './BaseDao';

export class ReviewDao implements BaseDao<Review> {
  async findAll(): Promise<Review[]> {
    return Review.find();
  }

  async findById(id: number): Promise<Review | null> {
    return Review.findOne({ where: { id } });
  }

  async create(review: Review): Promise<Review> {
    const foundReview = await Review.findOneBy({ order: review.order, type: review.type });

    if (foundReview != null) {
      throw new Error('review already exists');
    }

    return review.save();
  }

  async update(id: number, review: Partial<Review>): Promise<Review | null> {
    const existingReview = await Review.findOneBy({ id });

    if (!existingReview) return null;

    Object.assign(existingReview, review);
    return existingReview.save();
  }

  async delete(id: number): Promise<Review | null> {
    const existingReview = await Review.findOneBy({ id });

    if (!existingReview) return null;

    return Review.remove(existingReview);
  }
}
