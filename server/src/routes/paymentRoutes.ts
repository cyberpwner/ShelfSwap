import express from 'express';
import { PaymentController } from '../controller/PaymentController';

const router = express.Router();
const paymentController = new PaymentController();

router.get('/', paymentController.getAllPayments);

router.get('/:id', paymentController.getPaymentById);

router.post('/', paymentController.createPayment);

router.put('/:id', paymentController.updatePayment);

router.delete('/:id', paymentController.deletePayment);

export default router;
