import { ReviewDao } from '../dao/Review.dao';
import { PaginatedDto } from '../dto/Paginated.dto';
import { ReviewDto } from '../dto/Review.dto';
import { Review } from '../entities/Review';
import { MapperService } from './Mapper.service';

export class ReviewService {
  private readonly reviewDao: ReviewDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.reviewDao = new ReviewDao();
    this.mapperService = new MapperService();
  }

  async getAll(page = 1, pageSize = 10): Promise<PaginatedDto<ReviewDto>> {
    const { data: reviews, total } = await this.reviewDao.findAll(page, pageSize);

    if (reviews.length === 0) {
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: reviews.map((review) => this.mapperService.mapReviewToDto(review)),
      total,
      page,
      totalPages,
    };
  }

  async getById(id: string): Promise<ReviewDto | null> {
    const review = await this.reviewDao.findById(id);

    if (!review) return null;

    return this.mapperService.mapReviewToDto(review);
  }

  async createReview(review: Review): Promise<ReviewDto | null> {
    const createdReview = await this.reviewDao.create(review);

    if (!createdReview) return null;

    return this.mapperService.mapReviewToDto(createdReview);
  }

  async updateReview(id: string, review: Partial<Review>): Promise<ReviewDto | null> {
    const updatedReview = await this.reviewDao.update(id, review);

    if (!updatedReview) return null;

    return this.mapperService.mapReviewToDto(updatedReview);
  }

  async deleteReview(id: string): Promise<ReviewDto | null> {
    const deletedReview = await this.reviewDao.delete(id);

    if (!deletedReview) return null;

    return this.mapperService.mapReviewToDto(deletedReview);
  }
}
