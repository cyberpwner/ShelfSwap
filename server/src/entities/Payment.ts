import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from '../types/payment.types.d';
import { Order } from './Order';

@Entity('Payment')
@Unique(['order']) // an order can only be paid once. And since the payment is only stored if it was successful order_id can and should be unique.
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @OneToOne(() => Order, (order) => order.payment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
