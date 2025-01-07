import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PaymentMethod } from '../types/paymentTypes.d.js';
import { Order } from './Order';

@Entity('Payment')
@Unique(['order']) // an order can only be paid once. And since the payment is only stored if was successful order_id can and should be unique.
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
