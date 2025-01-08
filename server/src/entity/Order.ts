import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { OrderStatus } from '../types/orderTypes.d.js';
import { Review } from './Review';
import { Payment } from './Payment';

@Entity('Order')
@Unique(['book', 'buyer'])
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.orders, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.purchases, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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

  @OneToMany(() => Review, (review) => review.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @OneToOne(() => Payment, (payment) => payment.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  payment: Payment;
}
