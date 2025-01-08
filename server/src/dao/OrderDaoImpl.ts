import { Order } from '../entity/Order';
import { User } from '../entity/User';
import { isDuplicateOrder } from '../utils/orderUtils';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order> {
  async findAll(): Promise<Order[]> {
    return Order.find({ relations: ['book', 'buyer'] });
  }

  async findById(id: number): Promise<Order | null> {
    return Order.findOne({ where: { id } });
  }

  async create(order: Order): Promise<Order> {
    const isDuplicate = await isDuplicateOrder(order);

    if (isDuplicate) {
      throw new Error('order already exists');
    }

    return order.save();
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    const existingOrder = await Order.findOneBy({ id });

    if (!existingOrder) return null;

    Object.assign(existingOrder, order);
    return existingOrder.save();
  }

  async delete(id: number): Promise<Order | null> {
    const existingOrder = await Order.findOneBy({ id });

    if (!existingOrder) return null;

    return Order.remove(existingOrder);
  }

  async findOrdersByBuyer(username: string): Promise<Order[]> {
    const buyer = await User.findOneBy({ username });

    if (!buyer) {
      throw new Error('Order not found');
    }

    return Order.find({ where: { buyer }, relations: ['book', 'buyer'] });
  }

  async findOrdersBySeller(username: string): Promise<Order[]> {
    const seller = await User.findOne({ where: { username } });

    if (!seller) {
      throw new Error('Order not found');
    }

    return Order.find({ where: { book: { user: seller } }, relations: ['book', 'buyer'] });
  }
}
