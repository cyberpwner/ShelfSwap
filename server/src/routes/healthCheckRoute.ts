// import 'reflect-metadata';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
