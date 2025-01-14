import { OrderDao } from '../dao/OrderDao';
import { OrderDto } from '../dto/OrderDto';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';

export class OrderService implements InformativeError {
  private readonly orderDao: OrderDao;

  constructor() {
    this.orderDao = new OrderDao();
  }

  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderDao.findAll();

    if (orders.length === 0) return [];

    return orders.map((order) => new OrderDto(order));
  }

  async getOrderById(id: number): Promise<OrderDto | null> {
    const order = await this.orderDao.findById(id);

    if (!order) return null;

    return new OrderDto(order);
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
      const orderWithItems = await this.orderDao.createOrderWithItems(order, items);

      return new OrderDto(orderWithItems);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<OrderDto | null> {
    const updatedOrder = await this.orderDao.update(id, order);

    if (!updatedOrder) return null;

    return new OrderDto(updatedOrder);
  }

  async deleteOrder(id: number): Promise<OrderDto | null> {
    const deletedOrder = await this.orderDao.delete(id);

    if (!deletedOrder) return null;

    return new OrderDto(deletedOrder);
  }

  async getOrdersByUser(username: string): Promise<OrderDto[]> {
    const orders = await this.orderDao.findOrdersByUser(username);

    if (orders.length === 0) return [];

    return orders.map((order) => new OrderDto(order));
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
