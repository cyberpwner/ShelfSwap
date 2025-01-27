import { BookDao } from '../dao/Book.dao';
import { CartDao } from '../dao/Cart.dao';
import { CartItemDao } from '../dao/CartItem.dao';
import { UserDao } from '../dao/User.dao';
import { CartDto } from '../dto/Cart.dto';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { getErrorMsg, InformativeError } from '../utils/error.utils';
import { MapperService } from './Mapper.service';

export class CartService implements InformativeError {
  private readonly cartDao: CartDao;
  private readonly cartItemDao: CartItemDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.cartDao = new CartDao();
    this.cartItemDao = new CartItemDao();
    this.mapperService = new MapperService();
  }

  async fetchCart(userId: string): Promise<CartDto> {
    return this.mapperService.mapCartToDto(await this.getOrCreateCart(userId));
  }

  private async getOrCreateCart(userId: string): Promise<Cart> {
    const user = await new UserDao().findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let cart = await this.cartDao.findByUser(userId);

    if (cart) {
      return cart;
    }

    cart = new Cart();
    cart.user = user;
    cart = await this.cartDao.create(cart);

    return this.cartDao.findById(cart.id) as Promise<Cart>;
  }

  async addItemToCart(userId: string, bookId: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId);
    const book = await new BookDao().findById(bookId);

    if (!book) throw new Error('Book not found');

    let cartItem = (await this.cartItemDao.findByCart(cart.id)).find((item) => item.book.id === bookId && item.cart.id);

    if (!cartItem) {
      cartItem = new CartItem();
      cartItem.book = book;
      cartItem.cart = cart;
      cartItem.quantity = 0;
    }

    cartItem.quantity += quantity;
    await CartItem.save(cartItem);

    // fetch and return the updated cart
    return this.mapperService.mapCartToDto(await this.getOrCreateCart(userId));
  }

  async removeItemFromCart(userId: string, itemId: string) {
    const cartItem = await this.cartItemDao.findById(itemId);

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    this.cartItemDao.delete(itemId);

    // fetch and return the updated cart
    return this.mapperService.mapCartToDto(await this.getOrCreateCart(userId));
  }

  // Update the quantity of an item in the cart
  async updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart> {
    const cartItem = await this.cartItemDao.findById(itemId);

    if (!cartItem) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      await this.cartItemDao.delete(itemId); // Remove item if quantity is 0 or less
    } else {
      cartItem.quantity = quantity;
      await this.cartItemDao.update(itemId, cartItem);
    }

    return await this.getOrCreateCart(userId); // Return the updated cart
  }

  async updateCart(id: string, cart: Partial<Cart>): Promise<CartDto | null> {
    const updatedCart = await this.cartDao.update(id, cart);

    if (!updatedCart) return null;

    return this.mapperService.mapCartToDto(updatedCart);
  }

  async clearCart(id: string): Promise<CartDto | null> {
    const clearedCart = await this.cartDao.delete(id);

    if (!clearedCart) return null;

    return this.mapperService.mapCartToDto(clearedCart);
  }

  async getByUser(username: string): Promise<CartDto | null> {
    try {
      const cart = await this.cartDao.findByUser(username);

      if (!cart) return null;

      return this.mapperService.mapCartToDto(cart);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
