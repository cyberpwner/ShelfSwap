import express from 'express';
import { ReviewController } from '../controller/ReviewController';

const router = express.Router();
const reviewController = new ReviewController();

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReviewById);

router.post('/', reviewController.createReview);

router.put('/:id', reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);

export default router;
