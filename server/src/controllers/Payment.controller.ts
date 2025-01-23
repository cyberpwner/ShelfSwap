import { RequestHandler } from 'express';
import { PaymentService } from '../services/Payment.service';
import { Payment } from '../entities/Payment';
import { HttpStatusCode } from '../types/http.types.d';

export class PaymentController {
  private readonly paymentService = new PaymentService();

  getAllPayments: RequestHandler = async (req, res) => {
    try {
      const payments = await this.paymentService.getAllPayments();

      res.status(HttpStatusCode.OK).json(payments);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch payments', error: error instanceof Error ? error.message : error });
    }
  };

  getPaymentById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await this.paymentService.getPaymentById(id);

      if (payment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(payment);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch payment', error: error instanceof Error ? error.message : error });
    }
  };

  createPayment: RequestHandler = async (req, res) => {
    try {
      const payment = new Payment();
      Object.assign(payment, req.body);

      const createdPayment = await this.paymentService.createPayment(payment);

      if (createdPayment == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Payment could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdPayment);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create payment', error: error instanceof Error ? error.message : error });
    }
  };

  updatePayment: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const payment = new Payment();
      Object.assign(payment, req.body);

      const updatedPayment = await this.paymentService.updatePayment(id, payment);

      if (updatedPayment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedPayment);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update payment', error: error instanceof Error ? error.message : error });
    }
  };

  deletePayment: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedPayment = await this.paymentService.deletePayment(id);

      if (deletedPayment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedPayment);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete payment', error: error instanceof Error ? error.message : error });
    }
  };
}
