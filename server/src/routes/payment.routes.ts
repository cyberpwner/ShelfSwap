import express from 'express';
import { PaymentController } from '../controllers/Payment.controller';
import { PaymentValidation } from '../middleware/PaymentValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const paymentController = new PaymentController();
const paymentValidation = new PaymentValidation();

router.get('/', paymentController.getAllPayments);

router.get('/:id', CommonValidation.validateId, paymentController.getPaymentById);

router.post('/', paymentValidation.validateCreatePayment, paymentController.createPayment);

router.put(
  '/:id',
  CommonValidation.validateId,
  paymentValidation.validateUpdatePayment,
  paymentController.updatePayment,
);

router.delete('/:id', CommonValidation.validateId, paymentController.deletePayment);

export default router;
