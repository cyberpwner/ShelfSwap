import { RequestHandler } from 'express';
import { PaymentService } from '../services/Payment.service';
import { Payment } from '../entities/Payment';
import { HttpStatusCode } from '../types/http.types.d';

export class PaymentController {
  private readonly paymentService = new PaymentService();

  getAll: RequestHandler = async (_req, res) => {
    try {
      const payments = await this.paymentService.getAll();

      res.status(HttpStatusCode.OK).json(payments);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch payments' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await this.paymentService.getById(id);

      if (payment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(payment);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch payment' });
    }
  };

  createPayment: RequestHandler = async (req, res) => {
    try {
      const payment = new Payment();
      Object.assign(payment, req.body);

      const createdPayment = await this.paymentService.createPayment(payment);

      if (createdPayment == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Payment could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdPayment);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create payment' });
    }
  };

  updatePayment: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const payment = new Payment();
      Object.assign(payment, req.body);

      const updatedPayment = await this.paymentService.updatePayment(id, payment);

      if (updatedPayment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedPayment);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update payment' });
    }
  };

  deletePayment: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedPayment = await this.paymentService.deletePayment(id);

      if (deletedPayment == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Payment not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedPayment);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete payment' });
    }
  };
}
