import { PaymentDao } from '../dao/PaymentDao';
import { PaymentDto } from '../dto/PaymentDto';
import { Payment } from '../entity/Payment';

export class PaymentService {
  private readonly paymentDao: PaymentDao;

  constructor() {
    this.paymentDao = new PaymentDao();
  }

  async getAllPayments(): Promise<PaymentDto[]> {
    const payments = await this.paymentDao.findAll();

    if (payments.length === 0) return [];

    return payments.map((payment) => new PaymentDto(payment));
  }

  async getPaymentById(id: number): Promise<PaymentDto | null> {
    const payment = await this.paymentDao.findById(id);

    if (!payment) return null;

    return new PaymentDto(payment);
  }

  async createPayment(payment: Payment): Promise<PaymentDto | null> {
    const createdPayment = await this.paymentDao.create(payment);

    if (!createdPayment) return null;

    return new PaymentDto(createdPayment);
  }

  async updatePayment(id: number, payment: Partial<Payment>): Promise<PaymentDto | null> {
    const updatedPayment = await this.paymentDao.update(id, payment);

    if (!updatedPayment) return null;

    return new PaymentDto(updatedPayment);
  }

  async deletePayment(id: number): Promise<PaymentDto | null> {
    const deletedPayment = await this.paymentDao.delete(id);

    if (!deletedPayment) return null;

    return new PaymentDto(deletedPayment);
  }
}
