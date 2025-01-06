import { PaymentDao } from '../dao/PaymentDao';
import { Payment } from '../entity/Payment';

export class PaymentService {
  private paymentDao: PaymentDao;

  constructor() {
    this.paymentDao = new PaymentDao();
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentDao.findAll();
  }

  async getPaymentById(id: number): Promise<Payment | null> {
    return this.paymentDao.findById(id);
  }

  async createPayment(payment: Payment): Promise<Payment | null> {
    return this.paymentDao.create(payment);
  }

  async updatePayment(id: number, payment: Partial<Payment>) {
    return this.paymentDao.update(id, payment);
  }

  async deletePayment(id: number): Promise<boolean> {
    return this.paymentDao.delete(id);
  }
}
