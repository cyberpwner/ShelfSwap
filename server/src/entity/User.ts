import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../types/userTypes.d.js';
import { Book } from './Book';
import { Order } from './Order.js';

// note to future self or other devs:
// class properties should follow camelCase naming, typeorm will automatically convert them to snake_case in the DB.
// this is achieved using the 'typeorm-naming-strategies' library. (checkout dataSource file, specifically the namingStrategy property)
@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
  })
  profilePicUrl: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Order, (order) => order.seller)
  sales: Order[];

  @OneToMany(() => Order, (order) => order.buyer)
  purchases: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
