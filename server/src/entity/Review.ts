import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ReviewRating, ReviewType } from '../types/reviewTypes.d.js';
import { Order } from './Order';

@Entity('Review')
@Unique(['order'])
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

  @OneToOne(() => Order, (order) => order.review, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
