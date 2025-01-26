import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Book } from './Book';

@Entity('Cart_Item')
@Unique(['cart', 'book'])
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.cartItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({
    type: 'int',
    unsigned: true,
  })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
