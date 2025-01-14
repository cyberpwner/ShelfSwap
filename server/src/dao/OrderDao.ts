import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { AppDataSource } from '../utils/dataSource';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';
import { isDuplicateOrder } from '../utils/orderUtils';
import { BaseDao } from './BaseDao';

export class OrderDao implements BaseDao<Order>, InformativeError {
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

  async create(entity: Order): Promise<Order> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }

  async createOrderWithItems(order: Order, items: OrderItem[]): Promise<Order> {
    try {
      const isDuplicate = await isDuplicateOrder(order);
      if (isDuplicate) {
        throw new Error('order already exists');
      }

      const createdOrderWithItems = await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        // 1. create and save order
        const newOrder = transactionalEntityManager.create(Order, order);
        await transactionalEntityManager.save(newOrder);

        // 2. create and save order items
        const newItems = items.map((item) => {
          return transactionalEntityManager.create(OrderItem, {
            ...item,
            order: newOrder, // linking the item to the order created above
          });
        });

        await transactionalEntityManager.save(newItems);

        // 3. TODO: Update Inventory
        // Add logic here to deduct the purchased quantity from the book's inventory.

        return {
          order: newOrder,
          items: newItems,
        };
      });

      const createdOrder = new Order();
      Object.assign(createdOrder, createdOrderWithItems.order);
      createdOrder.items = createdOrderWithItems.items;

      return createdOrder;
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
      return Order.find({ where: { user: { username } }, relations: ['user', 'items'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
