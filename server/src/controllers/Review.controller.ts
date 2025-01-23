import { RequestHandler } from 'express';
import { ReviewService } from '../services/Review.service';
import { Review } from '../entities/Review';
import { HttpStatusCode } from '../types/http.types.d';

export class ReviewController {
  private readonly reviewService = new ReviewService();

  getAllReviews: RequestHandler = async (req, res) => {
    try {
      const reviews = await this.reviewService.getAllReviews();

      res.status(HttpStatusCode.OK).json(reviews);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch reviews', error: error instanceof Error ? error.message : error });
    }
  };

  getReviewById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const review = await this.reviewService.getReviewById(id);

      if (review == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(review);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch review', error: error instanceof Error ? error.message : error });
    }
  };

  createReview: RequestHandler = async (req, res) => {
    try {
      const review = new Review();
      Object.assign(review, req.body);

      const createdReview = await this.reviewService.createReview(review);

      if (createdReview == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Review could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdReview);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create review', error: error instanceof Error ? error.message : error });
    }
  };

  updateReview: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const review = new Review();
      Object.assign(review, req.body);

      const updatedReview = await this.reviewService.updateReview(id, review);

      if (updatedReview == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedReview);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update review', error: error instanceof Error ? error.message : error });
    }
  };

  deleteReview: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedReview = await this.reviewService.deleteReview(id);

      if (deletedReview == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Review not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedReview);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete review', error: error instanceof Error ? error.message : error });
    }
  };
}
