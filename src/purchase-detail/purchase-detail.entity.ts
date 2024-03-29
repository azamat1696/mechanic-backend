/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

// Entities
import { Purchase } from '../purchases/purchase.entity';
import { Product } from '../products/product.entity';

@Entity()
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Purchase, {
    onDelete: 'CASCADE',
  })
  purchase: Purchase;

  @ManyToOne(() => Product)
  product: Product;
  // _________
  // RELATIONS
  // _________

  @Column()
  productId: number;

  @Column()
  purchaseId: number;

  @Column()
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
