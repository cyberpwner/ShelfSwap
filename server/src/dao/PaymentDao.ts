import { Payment } from '../entity/Payment';
import { BaseDao } from './BaseDao';

export class PaymentDao implements BaseDao<Payment> {
  async findAll(): Promise<Payment[]> {
    return Payment.find();
  }

  async findById(id: number): Promise<Payment | null> {
    return Payment.findOne({ where: { id } });
  }

  async create(payment: Payment): Promise<Payment | null> {
    return payment.save();
  }

  async update(id: number, payment: Partial<Payment>): Promise<Payment | null> {
    const existingPayment = await Payment.findOne({ where: { id } });

    if (!existingPayment) return null;

    Object.assign(existingPayment, payment);
    return existingPayment.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingPayment = await Payment.findOneBy({ id });

    if (!existingPayment) return false;

    await Payment.remove(existingPayment);
    return true;
  }
}
