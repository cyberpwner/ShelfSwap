import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';
import { OrderItem } from './OrderItem';
import { Review } from './Review';

@Entity('Book')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
  })
  isbn: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToMany(() => Review, (review) => review.book, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @ManyToMany(() => Author, (author) => author.books, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  authors: Author[];

  @ManyToMany(() => Category, (category) => category.books, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @OneToMany(() => OrderItem, (item) => item.book, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
