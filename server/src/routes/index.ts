import { Router } from 'express';

import { AppDataSource } from '../utils/dataSource.js';
import healthcheckRoute from './healthCheck.routes.js';
import userRoutes from './user.routes.js';
import bookRoutes from './book.routes.js';
import orderRoutes from './order.routes.js';
// import orderItemRoutes from './orderItem.routes.js';
import categoryRoutes from './category.routes.js';
import authorRoutes from './author.routes.js';
import addressRoutes from './address.routes.js';
import paymentRoutes from './payment.routes.js';
import reviewRoutes from './review.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

try {
  await AppDataSource.initialize();
  console.log('DB connection established successfully!');
} catch (error) {
  let errorMsg = 'An unkown error occurred';

  if (error instanceof Error) {
    errorMsg = error.message;
  }

  console.log('Failed to connect to database.', errorMsg);
}

router.use('/healthcheck', healthcheckRoute);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/orders', orderRoutes);
// router.use('/orderItems', orderItemRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/addresses', addressRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use(authRoutes);

export default router;
