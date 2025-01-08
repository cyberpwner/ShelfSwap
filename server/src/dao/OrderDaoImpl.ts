import { Order } from '../entity/Order';
import { User } from '../entity/User';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order> {
  async findAll(): Promise<Order[]> {
    return Order.find({ relations: ['book', 'buyer'] });
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

  async findOrdersByBuyer(username: string): Promise<Order[]> {
    const buyer = await User.findOneBy({ username });

    if (!buyer) {
      throw new Error('User not found');
    }

    return Order.find({ where: { buyer }, relations: ['book', 'buyer'] });
  }

  async findOrdersBySeller(username: string): Promise<Order[]> {
    const seller = await User.findOne({ where: { username } });

    if (!seller) {
      throw new Error('User not found');
    }

    return Order.find({ where: { book: { user: seller } }, relations: ['book', 'buyer'] });
  }
}
