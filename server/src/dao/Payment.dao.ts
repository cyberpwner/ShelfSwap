import { Payment } from '../entities/Payment';
import { BaseDao } from './Base.dao';

type PaymentRelations = 'order';

export class PaymentDao implements BaseDao<Payment> {
  async findAll(page = 1, pageSize = 10): Promise<{ data: Payment[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [payments, total] = await Payment.findAndCount({
      relations: ['order'] as PaymentRelations[],
      skip,
      take: pageSize,
    });

    return { data: payments, total };
  }

  async findById(id: string): Promise<Payment | null> {
    return Payment.findOne({ where: { id }, relations: ['order'] as PaymentRelations[] });
  }

  async create(payment: Payment): Promise<Payment> {
    const foundPayment = await Payment.findOneBy({ order: payment.order });

    if (foundPayment != null) {
      throw new Error('payment already exists');
    }

    return payment.save();
  }

  async update(id: string, payment: Partial<Payment>): Promise<Payment | null> {
    const existingPayment = await Payment.findOneBy({ id });

    if (!existingPayment) return null;

    Object.assign(existingPayment, payment);
    return existingPayment.save();
  }

  async delete(id: string): Promise<Payment | null> {
    const existingPayment = await Payment.findOneBy({ id });

    if (!existingPayment) return null;

    return Payment.remove(existingPayment);
  }
}
