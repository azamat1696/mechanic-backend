/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

// Entities
import { Purchase } from '../purchases/purchase.entity';
import { Merchant } from '../merchants/merchant.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchase: Purchase;

  @ManyToOne(() => Merchant, (merchant) => merchant.suppliers)
  merchant: Merchant;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product;
  // _________
  // RELATIONS
  // _________

  @Column()
  merchantId: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
