import { Router } from 'express';
import { CartController } from '../controllers/Cart.controller';
import { Auth } from '../middleware/Auth.middleware';
import { UserRole } from '../types/user.types.d';

const router = Router();
const cartController = new CartController();
const auth = new Auth();

router.use(auth.authenticateAccessToken);
router.use(auth.authorize([UserRole.ADMIN, UserRole.USER]));

router.get('/', cartController.fetchCart);
router.post('/items', cartController.addItemToCart);
router.delete('/items/:id', cartController.removeItemFromCart);
router.put('/items/:id', cartController.updateItemQuantity);
router.delete('/', cartController.clearCart);

export default router;
