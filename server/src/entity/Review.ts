import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ReviewRating, ReviewType } from '../types/reviewTypes.d.js';
import { Order } from './Order';

@Entity('Review')
@Unique(['order', 'type']) // each order can (and should) have only two reviews, one from buyer and another frmo seller
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ReviewType,
  })
  type: ReviewType;

  @Column({
    type: 'enum',
    enum: ReviewRating,
  })
  rating: ReviewRating;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  comment: string;

  @ManyToOne(() => Order, (order) => order.reviews, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
