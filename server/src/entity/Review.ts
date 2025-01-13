import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ReviewRating } from '../types/reviewTypes.d.js';
import { Order } from './Order';

@Entity('Review')
@Unique(['order'])
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
