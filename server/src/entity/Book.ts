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

  // TODO: give all foreign keys in the DB the CASCADe option on update (and delete, maybe?)
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

  @OneToMany(() => Order, (order) => order.book)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
