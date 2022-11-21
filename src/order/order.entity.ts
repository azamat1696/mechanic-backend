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

// Entities
import { Merchant } from '../merchants/merchant.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { User } from '../users/user.entity';

export enum JobStatus {
  Waiting = 'Waiting',
  InProgress = 'In Progress',
  Complete = 'Complete',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Merchant, (merchant) => merchant.order)
  merchant: Merchant;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;
  // _________
  // RELATIONS
  // _________

  @Column({
    default: JobStatus.Waiting,
  })
  status: JobStatus;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true, name: 'Active' })
  isActive: boolean;
}
