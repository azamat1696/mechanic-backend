/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from './users/user.entity';
import { Merchant } from './merchants/merchant.entity';
import { Order } from './order/order.entity';
import { Product } from './products/product.entity';
import { OrderDetail } from './order-detail/order-detail.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Purchase } from './purchases/purchase.entity';
import { PurchaseDetail } from './purchase-detail/purchase-detail.entity';
import { Job } from './job/job.entity';
import { JobDetail } from './job-detail/job-detail.entity';

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
// import dotenv from 'dotenv';
// import { DatabaseModule } from '../src/db/database.module';

// dotenv.config({
//   path:
//     process.env.NODE_ENV === 'production'
//       ? '.env.production'
//       : '.env.development',
// });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        port: configService.get<number>('DB_PORT'),
        host: configService.get<string>('HOST'),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [
          User,
          Merchant,
          Order,
          Product,
          OrderDetail,
          Supplier,
          Purchase,
          PurchaseDetail,
          Job,
          JobDetail,
        ],
        synchronize: true,
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   port: 3306,
    //   host: 'j5zntocs2dn6c3fj.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    //   username: 'qegc4sztfwbmkgsd',
    //   password: 'lps2raf2ogwkf59c',
    //   database: 'keoa78irb4mz2plv',
    //   entities: [
    //     User,
    //     Merchant,
    //     Order,
    //     Product,
    //     OrderDetail,
    //     Supplier,
    //     Purchase,
    //     PurchaseDetail,
    //     Job,
    //     JobDetail,
    //   ],
    //   synchronize: true,
    // }),
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
