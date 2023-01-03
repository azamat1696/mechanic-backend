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
import { Supplier } from 'src/suppliers/supplier.entity';
import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Merchant, (merchant) => merchant.products)
  merchant: Merchant;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.product)
  purchaseDetail: PurchaseDetail;
  // _________
  // RELATIONS
  // _________

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  merchantId: number;

  @Column()
  supplierId: number;

  @Column({
    default: 3,
  })
  minimum: number;

  @Column()
  costPrice: number;

  @Column()
  retailPrice: number;

  @Column()
  image: string;

  @Column()
  product_code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
