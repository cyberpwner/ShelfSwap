import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { OrderStatus } from '../types/orderTypes.d.js';

@Entity('Order')
@Unique(['book', 'seller', 'buyer'])
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.orders)
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({
    name: 'seller_id',
  })
  seller: User;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({
    name: 'buyer_id',
  })
  buyer: User;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true, // mariadb (and many others) allows a unique attribute to be null in multiple rows of a table.
  })
  trackingNumber: string;
}
