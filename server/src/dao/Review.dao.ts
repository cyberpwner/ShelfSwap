import { Review } from '../entities/Review';
import { BaseDao } from './Base.dao';

type ReviewRelations = 'book' | 'user';

export class ReviewDao implements BaseDao<Review> {
  async findAll(page?: number, pageSize?: number): Promise<{ data: Review[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [reviews, total] = await Review.findAndCount({
      relations: ['user', 'book'] as ReviewRelations[],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: reviews, total };
  }

  async findById(id: string): Promise<Review | null> {
    return Review.findOne({ where: { id }, relations: ['user', 'book'] as ReviewRelations[] });
  }

  async create(review: Review): Promise<Review> {
    const foundReview = await Review.findOneBy({ user: review.user, book: review.book });

    if (foundReview != null) {
      throw new Error('review already exists');
    }

    return review.save();
  }

  async update(id: string, review: Partial<Review>): Promise<Review | null> {
    const existingReview = await Review.findOneBy({ id });

    if (!existingReview) return null;

    Object.assign(existingReview, review);
    return existingReview.save();
  }

  async delete(id: string): Promise<Review | null> {
    const existingReview = await Review.findOneBy({ id });

    if (!existingReview) return null;

    return Review.remove(existingReview);
  }
}
