import { RequestHandler } from 'express';
import { OrderItemService } from '../services/OrderItem.service';
import { OrderItem } from '../entity/OrderItem';

export class OrderItemController {
  private readonly orderItemService = new OrderItemService();

  getOrderItemById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const orderItem = await this.orderItemService.getOrderItemById(id);

      if (orderItem == null) {
        res.status(404).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orderItem', error: error instanceof Error ? error.message : error });
    }
  };

  updateOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const orderItem = new OrderItem();
      Object.assign(orderItem, req.body);

      const updatedOrderItem = await this.orderItemService.updateOrderItem(id, orderItem);

      if (updatedOrderItem == null) {
        res.status(404).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update orderItem', error: error instanceof Error ? error.message : error });
    }
  };

  deleteOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedOrderItem = await this.orderItemService.deleteOrderItem(id);

      if (deletedOrderItem == null) {
        res.status(404).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(200).json(deletedOrderItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete orderItem', error: error instanceof Error ? error.message : error });
    }
  };
}
