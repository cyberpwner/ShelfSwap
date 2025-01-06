// import 'reflect-metadata';
import { Router } from 'express';
import { AppDataSource } from '../utils/dataSource';

const router = Router();

router.get('/healthcheck', async (_, res) => {
  try {
    await AppDataSource.initialize();
    console.log('DB connection established successfully!');

    await AppDataSource.synchronize();
    console.log('DB connection synchronized successfully!');

    res.status(200).json({ status: 'OK' });
  } catch (error) {
    let errorMsg = 'An unkown error occurred';

    if (error instanceof Error) {
      errorMsg = error.message;
    }

    res.status(500).json({
      status: 'Database connection failed',
      error: errorMsg,
    });
  }
});

export default router;
