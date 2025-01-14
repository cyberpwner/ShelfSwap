import { OrderItem } from '../entity/OrderItem';
import { BaseDao } from './BaseDao';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';

export class OrderItemDao implements BaseDao<OrderItem>, InformativeError {
  async findAll(): Promise<OrderItem[]> {
    try {
      return OrderItem.find({ relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findById(id: number): Promise<OrderItem | null> {
    try {
      return OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(entity: OrderItem): Promise<OrderItem> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }

  async update(id: number, orderItem: Partial<OrderItem>): Promise<OrderItem | null> {
    try {
      const existingOrderItem = await OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });

      if (!existingOrderItem) return null;

      Object.assign(existingOrderItem, orderItem);
      return existingOrderItem.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: number): Promise<OrderItem | null> {
    try {
      const existingOrderItem = await OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });

      if (!existingOrderItem) return null;

      return OrderItem.remove(existingOrderItem);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findByOrder(orderId: number): Promise<OrderItem[]> {
    try {
      return OrderItem.find({ where: { order: { id: orderId } }, relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
