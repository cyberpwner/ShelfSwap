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
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch cart' });
    }
  };

  addItemToCart: RequestHandler = async (req: TypedRequestBody<AddItemToCartDto>, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }

    const item = req.body;

    if (!item) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'No item was provided' });
      return;
    }

    try {
      const cart = await this.cartService.addItemToCart(user.id, item.bookId, item.quantity);
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Failed to add item to cart' });
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
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Failed to remove item from cart' });
    }
  };

  updateItemQuantity: RequestHandler = async (req: TypedRequestBody<UpdateItemQuantityDto>, res) => {
    const user = req?.user;

    if (!user || typeof user === 'string') {
      throw new Error('Unauthorized');
    }
    const itemId = req.params.id;
    const { quantity } = req.body;

    try {
      const cart = await this.cartService.updateItemQuantity(user.id, itemId, quantity);
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Failed to update item quantity in cart' });
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
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Failed to clear cart' });
    }
  };
}
