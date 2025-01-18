import { ReviewDao } from '../dao/ReviewDao';
import { ReviewDto } from '../dto/ReviewDto';
import { Review } from '../entity/Review';
import { MapperService } from './MapperService';

export class ReviewService {
  private readonly reviewDao: ReviewDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.reviewDao = new ReviewDao();
    this.mapperService = new MapperService();
  }

  async getAllReviews(): Promise<ReviewDto[]> {
    const reviews = await this.reviewDao.findAll();

    if (reviews.length === 0) return [];

    return reviews.map((review) => this.mapperService.mapReviewToDto(review));
  }

  async getReviewById(id: number): Promise<ReviewDto | null> {
    const review = await this.reviewDao.findById(id);

    if (!review) return null;

    return this.mapperService.mapReviewToDto(review);
  }

  async createReview(review: Review): Promise<ReviewDto | null> {
    const createdReview = await this.reviewDao.create(review);

    if (!createdReview) return null;

    return this.mapperService.mapReviewToDto(createdReview);
  }

  async updateReview(id: number, review: Partial<Review>): Promise<ReviewDto | null> {
    const updatedReview = await this.reviewDao.update(id, review);

    if (!updatedReview) return null;

    return this.mapperService.mapReviewToDto(updatedReview);
  }

  async deleteReview(id: number): Promise<ReviewDto | null> {
    const deletedReview = await this.reviewDao.delete(id);

    if (!deletedReview) return null;

    return this.mapperService.mapReviewToDto(deletedReview);
  }
}
