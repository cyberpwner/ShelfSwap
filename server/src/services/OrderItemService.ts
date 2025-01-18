import { OrderItemDao } from '../dao/OrderItemDao';
import { OrderItemDto } from '../dto/OrderItemDto';
import { OrderItem } from '../entity/OrderItem';
import { MapperService } from './MapperService';

export class OrderItemService {
  private readonly orderItemDao: OrderItemDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.orderItemDao = new OrderItemDao();
    this.mapperService = new MapperService();
  }

  async getOrderItemById(id: number): Promise<OrderItemDto | null> {
    const item = await this.orderItemDao.findById(id);

    if (!item) return null;

    return this.mapperService.mapOrderItemToDto(item);
  }

  async updateOrderItem(id: number, orderItem: Partial<OrderItem>): Promise<OrderItemDto | null> {
    const updatedItem = await this.orderItemDao.update(id, orderItem);

    if (!updatedItem) return null;

    return this.mapperService.mapOrderItemToDto(updatedItem);
  }

  async deleteOrderItem(id: number): Promise<OrderItemDto | null> {
    const deletedItem = await this.orderItemDao.delete(id);

    if (!deletedItem) return null;

    return this.mapperService.mapOrderItemToDto(deletedItem);
  }

  async getItemsByOrder(orderId: number): Promise<OrderItemDto[]> {
    const items = await this.orderItemDao.findByOrder(orderId);

    if (items.length === 0) return [];

    return items.map((item) => this.mapperService.mapOrderItemToDto(item));
  }
}
