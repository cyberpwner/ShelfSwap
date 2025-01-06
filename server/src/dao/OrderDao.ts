import { Order } from '../entity/Order';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order> {
  async findAll(): Promise<Order[]> {
    return Order.find();
  }

  async findById(id: number): Promise<Order | null> {
    return Order.findOne({ where: { id } });
  }

  async create(order: Order): Promise<Order | null> {
    return order.save();
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    const existingOrder = await Order.findOne({ where: { id } });

    if (!existingOrder) return null;

    Object.assign(existingOrder, order);
    return existingOrder.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingOrder = await Order.findOneBy({ id });

    if (!existingOrder) return false;

    await Order.remove(existingOrder);
    return true;
  }
}
