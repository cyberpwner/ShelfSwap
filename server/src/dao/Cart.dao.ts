import { EntityManager } from 'typeorm';
import { Cart } from '../entities/Cart';
import { BaseDao } from './Base.dao';
import { getErrorMsg, InformativeError } from '../utils/error.utils';

type CartRelations = 'user' | 'items';

export class CartDao implements BaseDao<Cart>, InformativeError {
  private transactionalManager: EntityManager;

  async findAll(page?: number, pageSize?: number): Promise<{ data: Cart[]; total: number }> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const [carts, total] = await Cart.findAndCount({
      relations: ['user', 'items'] as CartRelations[],
      skip: skip ?? undefined,
      take: pageSize ?? undefined,
    });

    return { data: carts, total };
  }

  async findById(id: string): Promise<Cart | null> {
    try {
      return Cart.findOne({ where: { id }, relations: ['user', 'items', 'items.book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async create(cart: Cart): Promise<Cart> {
    try {
      return Cart.save(cart);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async update(id: string, cart: Partial<Cart>): Promise<Cart | null> {
    try {
      const existingCart = await Cart.findOne({ where: { id }, relations: ['user'] });

      if (!existingCart) return null;

      Object.assign(existingCart, cart);
      return existingCart.save();
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async delete(id: string): Promise<Cart | null> {
    try {
      const existingCart = await Cart.findOne({ where: { id }, relations: ['user'] });

      if (!existingCart) return null;

      return Cart.remove(existingCart);
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async findByUser(userId: string): Promise<Cart | null> {
    try {
      return Cart.findOne({ where: { user: { id: userId } }, relations: ['user', 'items', 'items.book'] });
    } catch (error) {
      throw new Error(this._getErrorInfo(error));
    }
  }

  async isDuplicate(cart: Cart): Promise<boolean> {
    return Cart.findOne({ where: { id: cart.id } }) != null;
  }

  setTransactionalManager(manager: EntityManager) {
    this.transactionalManager = manager;
  }

  _getErrorInfo(error: unknown) {
    return `Class: ${this.constructor.name} - Error: ${getErrorMsg(error)}`;
  }
}
