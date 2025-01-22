import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ReviewRating } from '../types/review.types.d';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity('Review')
@Unique(['book', 'user'])
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

  @ManyToOne(() => Book, (book) => book.reviews, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.reviews, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
