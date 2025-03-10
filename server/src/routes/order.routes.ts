import express from 'express';
import { OrderController } from '../controllers/Order.controller';
import { OrderValidation } from '../middleware/OrderValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const orderController = new OrderController();
const orderValidation = new OrderValidation();
const auth = new Auth();

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  orderValidation.validateCreateOrder,
  orderController.createOrder,
);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  orderController.getById,
);

router.get(
  '/filter/:username',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  orderValidation.validateGetbyUser,
  orderController.getByUser,
);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  orderValidation.validateUpdateOrder,
  orderController.updateOrder,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN]),
  CommonValidation.validateId,
  orderController.deleteOrder,
);

export default router;
