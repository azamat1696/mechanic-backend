/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
// import { User } from './users/user.entity';
// import { Merchant } from './merchants/merchant.entity';
// import { Order } from './order/order.entity';
// import { Product } from './products/product.entity';
// import { OrderDetail } from './order-detail/order-detail.entity';
// import { Supplier } from './suppliers/supplier.entity';
// import { Purchase } from './purchases/purchase.entity';
// import { PurchaseDetail } from './purchase-detail/purchase-detail.entity';
// import { Job } from './job/job.entity';
// import { JobDetail } from './job-detail/job-detail.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './products/product.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PurchaseModule } from './purchases/purchase.module';
import { SuppliersModule } from './suppliers/supplier.module';
import { PurchaseDetailModule } from './purchase-detail/purchase-detail.module';
import { JobModule } from './job/job.module';
import { JobDetailModule } from './job-detail/job-detail.module';
// import { DatabaseModule } from '../src/db/database.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import 'dotenv/config';

let envFilePath = '.env.dev';
console.log('Running in:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'PRODUCTION') {
  console.log('process.env.ENV', process.env.NODE_ENV);
  envFilePath = '.env.prod';
}

console.log('envFilePath ~~~~', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    EventEmitterModule.forRoot(),
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
    JobModule,
    JobDetailModule,
    // DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
