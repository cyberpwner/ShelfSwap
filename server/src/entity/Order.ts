import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { OrderStatus } from '../types/order.types.js';
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
    name: 'user_id',
  })
  user: User;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true, // mariadb, among many others, allows a unique attribute to be null in multiple rows of a table.
  })
  trackingNumber: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  @OneToOne(() => Payment, (payment) => payment.order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  payment: Payment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
