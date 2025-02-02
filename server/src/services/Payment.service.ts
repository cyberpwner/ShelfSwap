import { PaymentDao } from '../dao/Payment.dao';
import { PaginatedDto } from '../dto/Paginated.dto';
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

  async getAll(page?: number, pageSize?: number): Promise<PaginatedDto<PaymentDto>> {
    const { data: payments, total } = await this.paymentDao.findAll(page ?? undefined, pageSize ?? undefined);

    if (payments.length === 0) {
      return {
        data: [],
        total: 0,
        page: 0,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (pageSize && total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: payments.map((payment) => this.mapperService.mapPaymentToDto(payment)),
      total,
      page: page ?? 1,
      totalPages,
    };
  }

  async getById(id: string): Promise<PaymentDto | null> {
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
