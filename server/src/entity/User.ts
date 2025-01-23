import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types/user.types.d';
import { Order } from './Order.js';
import { Address } from './Address.js';
import { Review } from './Review.js';
import { compare, hash } from 'bcrypt';
import { APP_CONFIG } from '../constants/constants';

// note to future self or other devs:
// class properties should follow camelCase naming, typeorm will automatically convert them to snake_case in the DB.
// this is achieved using the 'typeorm-naming-strategies' library. (checkout dataSource file, specifically the namingStrategy property)
@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Order, (order) => order.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  purchases: Order[];

  @OneToMany(() => Review, (review) => review.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @OneToOne(() => Address, (address) => address.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, APP_CONFIG.bcrypt.saltRounds);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }
}
