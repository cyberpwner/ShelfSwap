import express from 'express';
import { OrderController } from '../controller/OrderController';

const router = express.Router();
const orderController = new OrderController();

router.post('/', orderController.createOrderHandler);
router.get('/:id', orderController.getOrderByIdHandler);
router.get('/buyer/:username', orderController.getOrdersByBuyer);
router.get('/seller/:username', orderController.getOrdersBySeller);

export default router;
