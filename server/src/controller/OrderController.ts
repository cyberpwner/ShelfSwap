import { RequestHandler } from 'express';
import { OrderService } from '../services/OrderService';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import { getErrorMsg, InformativeError } from '../utils/errorUtils';

export class OrderController implements InformativeError {
  private orderService = new OrderService();

  getOrdersByBuyer: RequestHandler = async (req, res, next) => {
    try {
      const { username } = req.params;

      if (!username || username.trim().length === 0) {
        res.status(400).json({ message: "username can't be empty" });
        return;
      }

      const orders = await this.orderService.getOrdersByBuyer(username);

      res.status(200).json(orders);
      next();
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };

  getOrdersBySeller: RequestHandler = async (req, res, next) => {
    try {
      const { username } = req.params;

      const sales = await this.orderService.getOrdersBySeller(username);

      res.status(200).json(sales);
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
      const order = new CreateOrderDto();
      Object.assign(order, req.body);

      const createdOrder = await this.orderService.createOrder(order);

      res.status(200).json(createdOrder);
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({ message: 'Failed to create order' });
    }
  };

  updateOrder: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const order = req.body;

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

      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.log(this._getErrorInfo(error));
      res.status(500).json({});
    }
  };

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
