/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';

// Entities
import { Supplier } from '../suppliers/supplier.entity';
import { Merchant } from '../merchants/merchant.entity';
import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';

export enum DeliveryStatus {
  PENDING = 'Pending',
  DELIVERED = 'Delivered',
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Supplier, (suppliers) => suppliers.purchase)
  supplier: Supplier;

  @ManyToOne(() => Merchant)
  merchant: Merchant;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase)
  purchaseDetail: PurchaseDetail;
  // _________
  // RELATIONS
  // _________

  @Column({
    default: DeliveryStatus.PENDING,
  })
  status: DeliveryStatus;

  @Column()
  supplierId: number;

  @Column()
  merchantId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
