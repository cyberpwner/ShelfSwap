import { OrderItem } from '../entities/OrderItem';
import { BaseDao } from './Base.dao';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { EntityManager } from 'typeorm';

export class OrderItemDao implements BaseDao<OrderItem>, InformativeError {
  private transactionalManager: EntityManager;

  async findAll(): Promise<OrderItem[]> {
    try {
      return OrderItem.find({ relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findById(id: string): Promise<OrderItem | null> {
    try {
      return OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(item: OrderItem): Promise<OrderItem> {
    if (this.transactionalManager == null) {
      throw new Error(
        'transactionalManager is not defined, order items should always be created within a transaction to ensure atomicity',
      );
    }

    try {
      const newItem = this.transactionalManager.create(OrderItem, item);
      return this.transactionalManager.save(newItem);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: string, orderItem: Partial<OrderItem>): Promise<OrderItem | null> {
    try {
      const existingOrderItem = await OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });

      if (!existingOrderItem) return null;

      Object.assign(existingOrderItem, orderItem);
      return existingOrderItem.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: string): Promise<OrderItem | null> {
    try {
      const existingOrderItem = await OrderItem.findOne({ where: { id }, relations: ['order', 'book'] });

      if (!existingOrderItem) return null;

      return OrderItem.remove(existingOrderItem);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findByOrder(orderId: string): Promise<OrderItem[]> {
    try {
      return OrderItem.find({ where: { order: { id: orderId } }, relations: ['order', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  setTransactionalManager(manager: EntityManager) {
    this.transactionalManager = manager;
  }

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
