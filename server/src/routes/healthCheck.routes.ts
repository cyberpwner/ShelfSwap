// import 'reflect-metadata';
import { Router } from 'express';
import { HttpStatusCode } from '../types/http.types.d';

const router = Router();

router.get('/', async (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: 'OK' });
});

export default router;
