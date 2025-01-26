import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem';

@Entity('Cart')
@Unique(['user'])
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => CartItem, (item) => item.cart)
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
