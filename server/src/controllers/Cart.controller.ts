import { RequestHandler } from 'express';
import { CartService } from '../services/Cart.service';
import { HttpStatusCode } from '../types/http.types.d';
import { TypedRequestBody } from '../types/express.types';
import { AddItemToCartDto, UpdateItemQuantityDto } from '../schemas/cart.schemas';

export class CartController {
  private readonly cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  fetchCart: RequestHandler = async (req, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }

    try {
      const cart = await this.cartService.fetchCart(user.id);
      res.status(HttpStatusCode.OK).json(cart);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch cart' });
    }
  };

  addItemToCart: RequestHandler = async (req: TypedRequestBody<AddItemToCartDto>, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }

    const item = req.body;

    if (!item) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'No item was provided' });
      return;
    }

    try {
      await this.cartService.addItemToCart(user.id, item.bookId, item.quantity);
      const updatedCart = await this.cartService.fetchCart(user.id);
      res.status(HttpStatusCode.OK).json(updatedCart);
    } catch {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Failed to add item to cart' });
    }
  };

  removeItemFromCart: RequestHandler = async (req, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }

    const itemId = req.params.id;

    try {
      const cart = await this.cartService.removeItemFromCart(user.id, itemId);
      res.status(HttpStatusCode.OK).json(cart);
    } catch {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Failed to remove item from cart' });
    }
  };

  updateItemQuantity: RequestHandler = async (req: TypedRequestBody<UpdateItemQuantityDto>, res) => {
    try {
      const user = req?.user;

      if (!user || typeof user === 'string') {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Unauthorized' });
        return;
      }

      const itemId = req.params.id;
      const { quantity } = req.body;

      const cart = await this.cartService.updateItemQuantity(user.id, itemId, quantity);
      res.status(HttpStatusCode.OK).json(cart);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update item quantity in cart' });
    }
  };

  clearCart: RequestHandler = async (req, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }

    const cartId = req.params.id;

    try {
      const cart = await this.cartService.clearCart(cartId);
      res.status(HttpStatusCode.OK).json(cart);
    } catch {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Failed to clear cart' });
    }
  };
}
