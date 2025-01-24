import { Router } from 'express';
import { Auth } from '../middleware/Auth.middleware';

const router = Router();
const auth = new Auth();

router.post('/refresh', auth.refreshTokens);

export default router;
