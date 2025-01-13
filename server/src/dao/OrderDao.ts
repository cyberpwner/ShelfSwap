import { Order } from '../entity/Order';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';
import { isDuplicateOrder } from '../utils/orderUtils';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order>, InformativeError {
  async findAll(): Promise<Order[]> {
    try {
      return Order.find({ relations: ['buyer'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findById(id: number): Promise<Order | null> {
    try {
      return Order.findOne({ where: { id }, relations: ['buyer'] });
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
      const existingOrder = await Order.findOne({ where: { id }, relations: ['buyer'] });

      if (!existingOrder) return null;

      Object.assign(existingOrder, order);
      return existingOrder.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: number): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['buyer'] });

      if (!existingOrder) return null;

      return Order.remove(existingOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findOrdersByBuyer(username: string): Promise<Order[]> {
    try {
      return Order.find({ where: { buyer: { username } }, relations: ['buyer', 'items'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
