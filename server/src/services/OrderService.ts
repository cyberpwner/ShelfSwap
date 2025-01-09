import { BookDao } from '../dao/BookDao';
import { OrderDao } from '../dao/OrderDao';
import { UserDao } from '../dao/UserDao';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import { OrderDto } from '../dto/OrderDto';
import { Order } from '../entity/Order';

export class OrderService {
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

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const bookDao = new BookDao();
    const userDao = new UserDao();

    const book = await bookDao.findWithUserById(createOrderDto.book);

    if (!book) {
      throw new Error('Book not found!');
    }

    const buyer = await userDao.findById(createOrderDto.buyer);

    if (!buyer) {
      throw new Error('Buyer not found!');
    }

    // user can't buy book from themselves (buyer === seller)
    if (buyer.id === book.user.id) {
      throw new Error('Book cannot be bought by its seller');
    }

    const order = new Order();
    order.book = book;
    order.buyer = buyer;
    order.status = createOrderDto.status;

    const createdOrder = await this.orderDao.create(order);
    return new OrderDto(createdOrder);
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

  async getOrdersByBuyer(username: string): Promise<OrderDto[]> {
    const orders = await this.orderDao.findOrdersByBuyer(username);

    return orders.map((order) => new OrderDto(order));
  }

  async getOrdersBySeller(username: string): Promise<OrderDto[]> {
    const orders = await this.orderDao.findOrdersBySeller(username);

    return orders.map((order) => new OrderDto(order));
  }
}
