import { PaymentDao } from '../dao/Payment.dao';
import { PaymentDto } from '../dto/Payment.dto';
import { Payment } from '../entities/Payment';
import { MapperService } from './Mapper.service';

export class PaymentService {
  private readonly paymentDao: PaymentDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.paymentDao = new PaymentDao();
    this.mapperService = new MapperService();
  }

  async getAllPayments(): Promise<PaymentDto[]> {
    const payments = await this.paymentDao.findAll();

    if (payments.length === 0) return [];

    return payments.map((payment) => this.mapperService.mapPaymentToDto(payment));
  }

  async getPaymentById(id: string): Promise<PaymentDto | null> {
    const payment = await this.paymentDao.findById(id);

    if (!payment) return null;

    return this.mapperService.mapPaymentToDto(payment);
  }

  async createPayment(payment: Payment): Promise<PaymentDto | null> {
    const createdPayment = await this.paymentDao.create(payment);

    if (!createdPayment) return null;

    return this.mapperService.mapPaymentToDto(createdPayment);
  }

  async updatePayment(id: string, payment: Partial<Payment>): Promise<PaymentDto | null> {
    const updatedPayment = await this.paymentDao.update(id, payment);

    if (!updatedPayment) return null;

    return this.mapperService.mapPaymentToDto(updatedPayment);
  }

  async deletePayment(id: string): Promise<PaymentDto | null> {
    const deletedPayment = await this.paymentDao.delete(id);

    if (!deletedPayment) return null;

    return this.mapperService.mapPaymentToDto(deletedPayment);
  }
}
