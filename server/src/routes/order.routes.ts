import express from 'express';
import { OrderController } from '../controller/Order.controller';

const router = express.Router();
const orderController = new OrderController();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrderById);

router.get('/filter/:username', orderController.getOrdersByUser);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

export default router;
