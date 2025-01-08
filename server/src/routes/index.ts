import { Router } from 'express';

import healthcheckRoute from './healthCheckRoute.js';
import userRoutes from './userRoutes.js';
import { AppDataSource } from '../utils/dataSource.js';
import bookRoutes from './bookRoutes.js';
import orderRoutes from './orderRoutes.js';

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

export default router;
