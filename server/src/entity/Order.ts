import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { OrderStatus } from '../types/orderTypes.d.js';
import { Review } from './Review';

@Entity('Order')
@Unique(['book', 'seller', 'buyer'])
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.orders, {
    nullable: false,
  })
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.sales, {
    nullable: false,
  })
  @JoinColumn({
    name: 'seller_id',
  })
  seller: User;

  @ManyToOne(() => User, (user) => user.purchases, {
    nullable: false,
  })
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

  @OneToMany(() => Review, (review) => review.order)
  reviews: Review[];
}
