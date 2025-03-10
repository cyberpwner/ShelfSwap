import express from 'express';
import { PaymentController } from '../controllers/Payment.controller';
import { PaymentValidation } from '../middleware/PaymentValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const paymentController = new PaymentController();
const paymentValidation = new PaymentValidation();
const auth = new Auth();

router.get('/', auth.authenticateAccessToken, auth.authorize([UserRole.ADMIN]), paymentController.getAll);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  paymentController.getById,
);

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  paymentValidation.validateCreatePayment,
  paymentController.createPayment,
);

router.put(
  '/:id',
  CommonValidation.validateId,
  paymentValidation.validateUpdatePayment,
  paymentController.updatePayment,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  paymentController.deletePayment,
);

export default router;
