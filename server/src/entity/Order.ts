import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { OrderStatus } from '../types/orderTypes.d.js';
import { Review } from './Review';
import { Payment } from './Payment';
import { OrderItem } from './OrderItem';

@Entity('Order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.purchases, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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

  @OneToMany(() => OrderItem, (item) => item.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  @OneToOne(() => Review, (review) => review.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  review: Review;

  @OneToOne(() => Payment, (payment) => payment.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  payment: Payment;
}
