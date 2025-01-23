import { RequestHandler } from 'express';
import { OrderItemService } from '../services/OrderItem.service';
import { OrderItem } from '../entities/OrderItem';
import { HttpStatusCode } from '../types/http.types.d';

export class OrderItemController {
  private readonly orderItemService = new OrderItemService();

  getOrderItemById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const orderItem = await this.orderItemService.getOrderItemById(id);

      if (orderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(orderItem);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch orderItem', error: error instanceof Error ? error.message : error });
    }
  };

  updateOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const orderItem = new OrderItem();
      Object.assign(orderItem, req.body);

      const updatedOrderItem = await this.orderItemService.updateOrderItem(id, orderItem);

      if (updatedOrderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedOrderItem);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update orderItem', error: error instanceof Error ? error.message : error });
    }
  };

  deleteOrderItem: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedOrderItem = await this.orderItemService.deleteOrderItem(id);

      if (deletedOrderItem == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'OrderItem not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedOrderItem);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete orderItem', error: error instanceof Error ? error.message : error });
    }
  };
}
