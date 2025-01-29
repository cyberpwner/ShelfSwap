import { RequestHandler } from 'express';
import { OrderItemService } from '../services/OrderItem.service';
import { OrderItem } from '../entities/OrderItem';
import { HttpStatusCode } from '../types/http.types.d';

export class OrderItemController {
  private readonly orderItemService = new OrderItemService();

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const orderItem = await this.orderItemService.getById(id);

      if (orderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(orderItem);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch orderItem' });
    }
  };

  updateOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const orderItem = new OrderItem();
      Object.assign(orderItem, req.body);

      const updatedOrderItem = await this.orderItemService.updateOrderItem(id, orderItem);

      if (updatedOrderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedOrderItem);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update orderItem' });
    }
  };

  deleteOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedOrderItem = await this.orderItemService.deleteOrderItem(id);

      if (deletedOrderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedOrderItem);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete orderItem' });
    }
  };
}
