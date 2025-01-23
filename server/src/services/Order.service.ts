import { OrderDao } from '../dao/Order.dao';
import { OrderItemDao } from '../dao/OrderItem.dao';
import { OrderDto } from '../dto/Order.dto';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { AppDataSource } from '../utils/dataSource';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { MapperService } from './Mapper.service';

export class OrderService implements InformativeError {
  private readonly orderDao: OrderDao;
  private readonly orderItemDao: OrderItemDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.orderDao = new OrderDao();
    this.orderItemDao = new OrderItemDao();
    this.mapperService = new MapperService();
  }

  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderDao.findAll();

    if (orders.length === 0) return [];

    return orders.map((order) => this.mapperService.mapOrderToDto(order));
  }

  async getOrderById(id: string): Promise<OrderDto | null> {
    const order = await this.orderDao.findById(id);

    if (!order) return null;

    return this.mapperService.mapOrderToDto(order);
  }

  // TODO: use transactions to create an order.
  // Only if all operations needed are successful (insert order to table, insert all order items) commit the transaction.

  // 1. start transaction
  // 2. insert order.
  // 3. insert all order items.
  // 4. if something fails rollback transaction.
  // 5. if all succeeds commit transaction

  async placeOrder(order: Order, items: OrderItem[]): Promise<OrderDto> {
    try {
      // TODO: an order should be created only if the payment is done, thus I need to implement that.
      const createdOrder = await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        // 0. pass transactionalEntityManager to orderDao and orderItemDao
        this.orderDao.setTransactionalManager(transactionalEntityManager);
        this.orderItemDao.setTransactionalManager(transactionalEntityManager);

        // 1. create and save order
        const newOrder = await this.orderDao.create(order);

        // 2. create and save order items
        const newItems = await Promise.all(
          items.map(async (item) => {
            Object.assign(item, { order: newOrder }); // link item to the order created above
            return await this.orderItemDao.create(item);
          }),
        );

        // 3. TODO: Update Inventory
        // Add logic here to deduct the purchased quantity from the book's inventory.

        // 4. link the order to the items and return it
        Object.assign(newOrder, { items: newItems });
        return newOrder;
      });

      return this.mapperService.mapOrderToDto(createdOrder);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<OrderDto | null> {
    const updatedOrder = await this.orderDao.update(id, order);

    if (!updatedOrder) return null;

    return this.mapperService.mapOrderToDto(updatedOrder);
  }

  async deleteOrder(id: string): Promise<OrderDto | null> {
    const deletedOrder = await this.orderDao.delete(id);

    if (!deletedOrder) return null;

    return this.mapperService.mapOrderToDto(deletedOrder);
  }

  async getOrdersByUser(username: string): Promise<OrderDto[]> {
    try {
      const orders = await this.orderDao.findOrdersByUser(username);

      if (orders.length === 0) return [];

      const sanitizedOrders = orders.map((order) => this.mapperService.mapOrderToDto(order));
      return sanitizedOrders;
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
