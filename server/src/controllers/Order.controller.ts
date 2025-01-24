import { RequestHandler } from 'express';
import { OrderService } from '../services/Order.service';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { HttpStatusCode } from '../types/http.types.d';

export class OrderController implements InformativeError {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getByUser: RequestHandler = async (req, res, next) => {
    try {
      const { username } = req.params;

      if (!username || username.trim().length === 0) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: "username can't be empty" });
        return;
      }

      const orders = await this.orderService.getByUser(username);

      res.status(HttpStatusCode.OK).json(orders);
      next();
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch orders' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const order = await this.orderService.getById(id);

      if (!order) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Order not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(order);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch order' });
    }
  };

  createOrder: RequestHandler = async (req, res) => {
    try {
      const order = new Order();
      Object.assign(order, req.body.order);

      const items: OrderItem[] = req.body.items.map((item: OrderItem) => {
        const orderItem = new OrderItem();
        Object.assign(orderItem, item);

        return orderItem;
      });

      const createdOrder = await this.orderService.placeOrder(order, items);

      res.status(HttpStatusCode.OK).json(createdOrder);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create order' });
    }
  };

  updateOrder: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const order = new Order();
      Object.assign(order, req.body);

      const updatedOrder = await this.orderService.updateOrder(id, order);

      if (!updatedOrder) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Order not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedOrder);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update order' });
    }
  };

  deleteOrder: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedOrder = await this.orderService.deleteOrder(id);

      if (!deletedOrder) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Order not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json({ deletedOrder });
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({});
    }
  };

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
