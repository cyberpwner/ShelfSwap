import { Router } from 'express';

import healthcheckRoute from './healthCheckRoute.js';

const router = Router();

router.use('/api', healthcheckRoute);

export default router;
