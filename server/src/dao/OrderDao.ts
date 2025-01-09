import { Order } from '../entity/Order';
import { User } from '../entity/User';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';
import { isDuplicateOrder } from '../utils/orderUtils';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order>, InformativeError {
  async findAll(): Promise<Order[]> {
    try {
      return Order.find({ relations: ['book', 'buyer'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findById(id: number): Promise<Order | null> {
    try {
      return Order.findOne({ where: { id }, relations: ['book', 'buyer'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const isDuplicate = await isDuplicateOrder(order);

      if (isDuplicate) {
        throw new Error('order already exists');
      }

      return order.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['book', 'buyer'] });

      if (!existingOrder) return null;

      Object.assign(existingOrder, order);
      return existingOrder.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: number): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['book', 'buyer'] });

      if (!existingOrder) return null;

      return Order.remove(existingOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findOrdersByBuyer(username: string): Promise<Order[]> {
    try {
      const buyer = await User.findOneBy({ username });
      if (!buyer) {
        throw new Error('Buyer not found');
      }

      return await Order.find({ where: { buyer: { username: buyer.username } }, relations: ['book', 'book.user', 'buyer'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findOrdersBySeller(username: string): Promise<Order[]> {
    try {
      const seller = await User.findOneBy({ username });

      if (!seller) {
        throw new Error('Seller not found');
      }

      return Order.find({ where: { book: { user: seller } }, relations: ['book', 'book.user', 'buyer'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
