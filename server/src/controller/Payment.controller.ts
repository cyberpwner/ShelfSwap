import { RequestHandler } from 'express';
import { PaymentService } from '../services/Payment.service';
import { Payment } from '../entity/Payment';

export class PaymentController {
  private readonly paymentService = new PaymentService();

  getAllPayments: RequestHandler = async (req, res) => {
    try {
      const payments = await this.paymentService.getAllPayments();

      res.status(200).json(payments);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to fetch payments', error: error instanceof Error ? error.message : error });
    }
  };

  getPaymentById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await this.paymentService.getPaymentById(id);

      if (payment == null) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }

      res.status(200).json(payment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to fetch payment', error: error instanceof Error ? error.message : error });
    }
  };

  createPayment: RequestHandler = async (req, res) => {
    try {
      const payment = new Payment();
      Object.assign(payment, req.body);

      const createdPayment = await this.paymentService.createPayment(payment);

      if (createdPayment == null) {
        res.status(400).json({ message: 'Payment could not be created' });
        return;
      }

      res.status(200).json(createdPayment);
    } catch (error) {
      res
        .status(500)
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
        res.status(404).json({ message: 'Payment not found' });
        return;
      }

      res.status(200).json(updatedPayment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to update payment', error: error instanceof Error ? error.message : error });
    }
  };

  deletePayment: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedPayment = await this.paymentService.deletePayment(id);

      if (deletedPayment == null) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }

      res.status(200).json(deletedPayment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to delete payment', error: error instanceof Error ? error.message : error });
    }
  };
}
