import { OrderDao } from '../dao/OrderDao';
import { Order } from '../entity/Order';

export class OrderService {
  private orderDao: OrderDao;

  constructor() {
    this.orderDao = new OrderDao();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderDao.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderDao.findById(id);
  }

  async createOrder(order: Order): Promise<Order | null> {
    return this.orderDao.create(order);
  }

  async updateOrder(id: number, order: Partial<Order>) {
    return this.orderDao.update(id, order);
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orderDao.delete(id);
  }
}
