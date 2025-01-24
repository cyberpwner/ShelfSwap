import express from 'express';
import { OrderItemController } from '../controllers/OrderItem.controller';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const orderItemController = new OrderItemController();
const auth = new Auth();

router.use(auth.authenticate, auth.authorize([UserRole.ADMIN]));

router.get('/:id', orderItemController.getOrderItemById);

router.put('/:id', orderItemController.updateOrderItem);

router.delete('/:id', orderItemController.deleteOrderItem);

export default router;
