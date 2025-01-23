import express from 'express';
import { OrderController } from '../controllers/Order.controller';
import { OrderValidation } from '../middleware/OrderValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const orderController = new OrderController();
const orderValidation = new OrderValidation();

router.post('/', orderValidation.validateCreateOrder, orderController.createOrder);

router.get('/:id', CommonValidation.validateId, orderController.getOrderById);

router.get('/filter/:username', orderValidation.validateGetbyUser, orderController.getOrdersByUser);

router.put('/:id', CommonValidation.validateId, orderValidation.validateUpdateOrder, orderController.updateOrder);

router.delete('/:id', CommonValidation.validateId, orderController.deleteOrder);

export default router;
