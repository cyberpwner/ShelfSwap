import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

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
    type: 'boolean',
  })
  isSold: boolean;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
