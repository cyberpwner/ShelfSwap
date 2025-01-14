import { ReviewDao } from '../dao/ReviewDao';
import { ReviewDto } from '../dto/ReviewDto';
import { Review } from '../entity/Review';

export class ReviewService {
  private readonly reviewDao: ReviewDao;

  constructor() {
    this.reviewDao = new ReviewDao();
  }

  async getAllReviews(): Promise<ReviewDto[]> {
    const reviews = await this.reviewDao.findAll();

    if (reviews.length === 0) return [];

    return reviews.map((review) => new ReviewDto(review));
  }

  async getReviewById(id: number): Promise<ReviewDto | null> {
    const review = await this.reviewDao.findById(id);

    if (!review) return null;

    return new ReviewDto(review);
  }

  async createReview(review: Review): Promise<ReviewDto | null> {
    const createdReview = await this.reviewDao.create(review);

    if (!createdReview) return null;

    return new ReviewDto(createdReview);
  }

  async updateReview(id: number, review: Partial<Review>): Promise<ReviewDto | null> {
    const updatedReview = await this.reviewDao.update(id, review);

    if (!updatedReview) return null;

    return new ReviewDto(updatedReview);
  }

  async deleteReview(id: number): Promise<ReviewDto | null> {
    const deletedReview = await this.reviewDao.delete(id);

    if (!deletedReview) return null;

    return new ReviewDto(deletedReview);
  }
}
