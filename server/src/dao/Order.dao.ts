import { EntityManager } from 'typeorm';
import { Order } from '../entities/Order';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { BaseDao } from './Base.dao';

type OrderRelations = 'user' | 'items' | 'payment';

export class OrderDao implements BaseDao<Order>, InformativeError {
  private transactionalManager: EntityManager;

  async findAll(page = 1, pageSize = 10): Promise<{ data: Order[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [orders, total] = await Order.findAndCount({
      relations: ['user', 'items', 'payment'] as OrderRelations[],
      skip,
      take: pageSize,
    });

    return { data: orders, total };
  }

  async findById(id: string): Promise<Order | null> {
    try {
      return Order.findOne({ where: { id }, relations: ['user', 'items', 'payment'] as OrderRelations[] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(order: Order): Promise<Order> {
    if (this.transactionalManager == null) {
      throw new Error(
        'transactionalManager is not defined, orders should always be created within a transaction to ensure atomicity',
      );
    }

    try {
      const newOrder = this.transactionalManager.create(Order, order);
      return this.transactionalManager.save(newOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: string, order: Partial<Order>): Promise<Order | null> {
    try {
      const existingOrder = await Order.findOne({ where: { id }, relations: ['user'] });

      if (!existingOrder) return null;

      Object.assign(existingOrder, order);
      return existingOrder.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: string): Promise<Order | null> {
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
