/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Merchant } from '../merchants/merchant.entity';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @OneToMany(() => Order, (order) => order.user)
  order: Order;

  @ManyToOne(() => Merchant, (merchant) => merchant.user)
  merchant: Merchant;

  // _________
  // RELATIONS
  // _________

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  merchantId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
