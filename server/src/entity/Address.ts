import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './User';

@Entity('Address')
@Unique(['user'])
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  addressLine1: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  addressLine2: string;

  @OneToOne(() => User, (user) => user.address, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
