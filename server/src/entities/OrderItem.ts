import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './Order';
import { Book } from './Book';

@Entity('Order_Item')
@Unique(['order', 'book'])
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  quantity: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  priceAtPurchase: number;

  @ManyToOne(() => Order, (order) => order.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @ManyToOne(() => Book, (book) => book.orderItems, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
