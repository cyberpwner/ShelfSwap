import { EntityManager } from 'typeorm';
import { CartItem } from '../entities/CartItem';
import { BaseDao } from './Base.dao';
import { getErrorMsg, InformativeError } from '../utils/error.utils';

type CartItemRelations = 'cart' | 'book';

export class CartItemDao implements BaseDao<CartItem>, InformativeError {
  private transactionalManager: EntityManager;

  async findAll(page?: number, pageSize?: number): Promise<{ data: CartItem[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [cartItems, total] = await CartItem.findAndCount({
      relations: ['book', 'cart'] as CartItemRelations[],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: cartItems, total };
  }

  async findById(id: string): Promise<CartItem | null> {
    try {
      return CartItem.findOne({ where: { id }, relations: ['cart', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(item: CartItem): Promise<CartItem> {
    if (this.transactionalManager == null) {
      throw new Error(
        'transactionalManager is not defined, cart items should always be created within a transaction to ensure atomicity and data consistency',
      );
    }

    try {
      const newItem = this.transactionalManager.create(CartItem, item);
      return this.transactionalManager.save(newItem);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: string, cartItem: Partial<CartItem>): Promise<CartItem | null> {
    try {
      const existingCartItem = await CartItem.findOne({ where: { id }, relations: ['cart', 'book'] });

      if (!existingCartItem) return null;

      Object.assign(existingCartItem, cartItem);
      return existingCartItem.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: string): Promise<CartItem | null> {
    try {
      const existingCartItem = await CartItem.findOne({ where: { id }, relations: ['cart', 'book'] });

      if (!existingCartItem) return null;

      return CartItem.remove(existingCartItem);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findByCart(cartId: string): Promise<CartItem[]> {
    try {
      return CartItem.find({ where: { cart: { id: cartId } }, relations: ['cart', 'book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  setTransactionalManager(manager: EntityManager) {
    this.transactionalManager = manager;
  }

  _getErrorInfo(error: unknown): string {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
