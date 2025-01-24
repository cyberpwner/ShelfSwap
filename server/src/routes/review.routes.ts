import express from 'express';
import { ReviewController } from '../controllers/Review.controller';
import { ReviewValidation } from '../middleware/ReviewValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const reviewController = new ReviewController();
const reviewValidation = new ReviewValidation();
const auth = new Auth();

// TODO: add getReviewsByBook route

router.get('/', auth.authenticateAccessToken, auth.authorize([UserRole.ADMIN]), reviewController.getAll);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  reviewController.getById,
);

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  reviewValidation.validateCreateReview,
  reviewController.createReview,
);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  reviewValidation.validateUpdateReview,
  reviewController.updateReview,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  reviewController.deleteReview,
);

export default router;
