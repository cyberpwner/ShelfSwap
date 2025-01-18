import { Router } from 'express';

import { AppDataSource } from '../utils/dataSource.js';
import healthcheckRoute from './healthCheckRoute.js';
import userRoutes from './userRoutes.js';
import bookRoutes from './bookRoutes.js';
import orderRoutes from './orderRoutes.js';
import orderItemRoutes from './orderItemRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import authorRoutes from './authorRoutes.js';
import addressRoutes from './addressRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import reviewRoutes from './reviewRoutes.js';

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
router.use('/orderItems', orderItemRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/addresses', addressRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);

export default router;
