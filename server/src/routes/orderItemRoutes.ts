import express from 'express';
import { OrderItemController } from '../controller/OrderItemController';

const router = express.Router();
const orderItemController = new OrderItemController();

router.get('/:id', orderItemController.getOrderItemById);

router.put('/:id', orderItemController.updateOrderItem);

router.delete('/:id', orderItemController.deleteOrderItem);

export default router;
