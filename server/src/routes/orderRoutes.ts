import express from 'express';
import { OrderController } from '../controller/OrderController';

const router = express.Router();
const orderController = new OrderController();

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/buyer/:username', orderController.getOrdersByBuyer);
router.get('/seller/:username', orderController.getOrdersBySeller);
router.delete('/:id', orderController.deleteOrder);

export default router;
