import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { Order } from './Order';
import { BookCondition } from '../types/bookTypes.d.js';

@Entity('Book')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: BookCondition,
  })
  condition: BookCondition;

  @Column({
    type: 'boolean',
  })
  isSold: boolean;

  // TODO: give all foreign keys in the DB the CASCADE option on update (and on delete, maybe?)
  @ManyToOne(() => User, (user) => user.books, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToMany(() => Category, (category) => category.books, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @OneToMany(() => Order, (order) => order.book, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
