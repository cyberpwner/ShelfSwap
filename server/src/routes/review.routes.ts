import express from 'express';
import { ReviewController } from '../controller/Review.controller';
import { ReviewValidation } from '../middleware/ReviewValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const reviewController = new ReviewController();
const reviewValidation = new ReviewValidation();

router.get('/', reviewController.getAllReviews);

router.get('/:id', CommonValidation.validateId, reviewController.getReviewById);

router.post('/', reviewValidation.validateCreateReview, reviewController.createReview);

router.put('/:id', CommonValidation.validateId, reviewValidation.validateUpdateReview, reviewController.updateReview);

router.delete('/:id', CommonValidation.validateId, reviewController.deleteReview);

export default router;
