import { RequestHandler } from 'express';
import { ReviewService } from '../services/Review.service';
import { Review } from '../entities/Review';
import { HttpStatusCode } from '../types/http.types.d';

export class ReviewController {
  private readonly reviewService = new ReviewService();

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = '1';
    }

    const decodedPageNum = Number(decodeURIComponent(String(pageNum)));

    try {
      const { data, page, total, totalPages } = await this.reviewService.getAll(decodedPageNum);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch reviews' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const review = await this.reviewService.getById(id);

      if (review == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(review);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch review' });
    }
  };

  createReview: RequestHandler = async (req, res) => {
    try {
      const review = new Review();
      Object.assign(review, req.body);

      const createdReview = await this.reviewService.createReview(review);

      if (createdReview == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Review could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdReview);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create review' });
    }
  };

  updateReview: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const review = new Review();
      Object.assign(review, req.body);

      const updatedReview = await this.reviewService.updateReview(id, review);

      if (updatedReview == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedReview);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update review' });
    }
  };

  deleteReview: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedReview = await this.reviewService.deleteReview(id);

      if (deletedReview == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedReview);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete review' });
    }
  };
}
