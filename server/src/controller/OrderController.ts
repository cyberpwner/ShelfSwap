import { RequestHandler } from 'express';
import { OrderService } from '../services/OrderService';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';

export class OrderController implements InformativeError {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getOrdersByUser: RequestHandler = async (req, res, next) => {
    try {
      const { username } = req.params;

      if (!username || username.trim().length === 0) {
        res.status(400).json({ message: "username can't be empty" });
        return;
      }

      const orders = await this.orderService.getOrdersByUser(username);

      res.status(200).json(orders);
      next();
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };

  getOrderById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const order = await this.orderService.getOrderById(id);

      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to fetch order' });
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

      res.status(200).json(createdOrder);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to create order' });
    }
  };

  updateOrder: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const order = new Order();
      Object.assign(order, req.body);

      const updatedOrder = await this.orderService.updateOrder(id, order);

      if (!updatedOrder) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to update order' });
    }
  };

  deleteOrder: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedOrder = await this.orderService.deleteOrder(id);

      if (!deletedOrder) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json({ deletedOrder });
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({});
    }
  };

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
