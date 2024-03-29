/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Product } from '../products/product.entity';
import { Order } from '../order/order.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { User } from '../users/user.entity';
import { Job } from '../job/job.entity';

export enum MerchantRole {
  MECHANIC = 'mechanic',
  BODYWORK = 'bodywork',
  ELECTRICIAN = 'electrician',
}

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  // _________

  // RELATIONS
  // _________

  @OneToMany(() => Supplier, (supplier) => supplier.merchant)
  suppliers: Supplier[];

  @OneToMany(() => Product, (product) => product.merchant)
  products: Product[];

  @OneToMany(() => Order, (order) => order.merchant)
  order: Order[];

  @OneToMany(() => User, (user) => user.merchant)
  user: User;

  @OneToMany(() => Job, (job) => job.merchant)
  job: Job;

  // _________
  // RELATIONS
  // _________

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MerchantRole,
    default: MerchantRole.MECHANIC,
  })
  role: MerchantRole;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  address3: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
