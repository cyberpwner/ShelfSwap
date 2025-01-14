import { OrderItemDao } from '../dao/OrderItemDao';
import { OrderItemDto } from '../dto/OrderItemDto';
import { OrderItem } from '../entity/OrderItem';

export class OrderItemService {
  private readonly orderItemDao: OrderItemDao;

  constructor() {
    this.orderItemDao = new OrderItemDao();
  }

  async getOrderItemById(id: number): Promise<OrderItemDto | null> {
    const item = await this.orderItemDao.findById(id);

    if (!item) return null;

    return new OrderItemDto(item);
  }

  async updateOrderItem(id: number, orderItem: Partial<OrderItem>): Promise<OrderItemDto | null> {
    const updatedItem = await this.orderItemDao.update(id, orderItem);

    if (!updatedItem) return null;

    return new OrderItemDto(updatedItem);
  }

  async deleteOrderItem(id: number): Promise<OrderItemDto | null> {
    const deletedItem = await this.orderItemDao.delete(id);

    if (!deletedItem) return null;

    return new OrderItemDto(deletedItem);
  }

  async getItemsByOrder(orderId: number): Promise<OrderItemDto[]> {
    const items = await this.orderItemDao.findByOrder(orderId);

    if (items.length === 0) return [];

    return items.map((item) => new OrderItemDto(item));
  }
}
