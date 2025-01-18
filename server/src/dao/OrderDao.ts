import { EntityManager } from 'typeorm';
import { Order } from '../entity/Order';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order>, InformativeError {
  private transactionalManager: EntityManager;

  async findAll(): Promise<Order[]> {
    try {
      return Order.find({ relations: ['user'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findById(id: number): Promise<Order | null> {
    try {
      return Order.findOne({ where: { id }, relations: ['user'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(order: Order): Promise<Order> {
    if (this.transactionalManager == null) {
      throw new Error('transactionalManager is not defined, orders should always be created within a transaction to ensure atomicity');
    }

    try {
      const newOrder = this.transactionalManager.create(Order, order);
      return this.transactionalManager.save(newOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['user'] });

      if (!existingOrder) return null;

      Object.assign(existingOrder, order);
      return existingOrder.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: number): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['user'] });

      if (!existingOrder) return null;

      return Order.remove(existingOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findOrdersByUser(username: string): Promise<Order[]> {
    try {
      return Order.find({ where: { user: { username } }, relations: ['user', 'items', 'items.book', 'items.order'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async isDuplicate(order: Order): Promise<boolean> {
    return Order.findOne({ where: { id: order.id } }) != null;
  }

  setTransactionalManager(manager: EntityManager) {
    this.transactionalManager = manager;
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
