import { Payment } from '../entity/Payment';
import { BaseDao } from './Base.dao';

export class PaymentDao implements BaseDao<Payment> {
  async findAll(): Promise<Payment[]> {
    return Payment.find();
  }

  async findById(id: string): Promise<Payment | null> {
    return Payment.findOne({ where: { id } });
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
