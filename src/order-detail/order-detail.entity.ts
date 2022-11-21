/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

// Entities
import { Order } from 'src/order/order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________

  @ManyToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  product: Product;

  // _________
  // RELATIONS
  // _________

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
