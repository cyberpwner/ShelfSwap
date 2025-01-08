import { ReviewDao } from '../dao/ReviewDaoImpl';
import { Review } from '../entity/Review';

export class ReviewService {
  private reviewDao: ReviewDao;

  constructor() {
    this.reviewDao = new ReviewDao();
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewDao.findAll();
  }

  async getReviewById(id: number): Promise<Review | null> {
    return this.reviewDao.findById(id);
  }

  async createReview(review: Review): Promise<Review | null> {
    return this.reviewDao.create(review);
  }

  async updateReview(id: number, review: Partial<Review>) {
    return this.reviewDao.update(id, review);
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviewDao.delete(id);
  }
}
