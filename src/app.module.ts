/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Entities
import { User } from './users/user.entity';
import { Merchant } from './merchants/merchant.entity';
import { Order } from './order/order.entity';
import { Product } from './products/product.entity';
import { OrderDetail } from './order-detail/order-detail.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Purchase } from './purchases/purchase.entity';
import { PurchaseDetail } from './purchase-detail/purchase-detail.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './products/product.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PurchaseModule } from './purchases/purchase.module';
import { SuppliersModule } from './suppliers/supplier.module';
import { PurchaseDetailModule } from './purchase-detail/purchase-detail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'halil',
      password: 'H@lilh2o',
      database: 'mechanic',
      entities: [
        User,
        Merchant,
        Order,
        Product,
        OrderDetail,
        Supplier,
        Purchase,
        PurchaseDetail,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MerchantsModule,
    OrderModule,
    ProductModule,
    OrderDetailModule,
    SuppliersModule,
    PurchaseModule,
    SuppliersModule,
    PurchaseDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}