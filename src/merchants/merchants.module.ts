/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { PuppeteerModule } from 'nest-puppeteer';

// Controllers
import { MerchantsController } from './controllers/merchants.controller';

// Services
import { MerchantsService } from './services/merchants.service';
import { ProductService } from '../products/services/product.service';
import { OrderService } from '../order/services/order.service';
import { OrderDetailService } from '../order-detail/services/order-detail.service';
import { SupplierService } from '../suppliers/services/suppliers.service';
import { PurchaseService } from '../purchases/services/purchases.service';
import { UsersService } from '../users/services/users.service';
import { PurchaseDetailService } from '../purchase-detail/services/purchase-detail.service';
import { JobService } from '../job/services/jobs.service';
import { JobDetailService } from '../job-detail/services/job-detail.service';

// Entities
import { Merchant } from './merchant.entity';
import { Product } from '../products/product.entity';
import { Order } from '../order/order.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { Purchase } from 'src/purchases/purchase.entity';
import { User } from '../users/user.entity';
import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';
import { Job } from '../job/job.entity';
import { JobDetail } from '../job-detail/job-detail.entity';

@Module({
  imports: [
    // PuppeteerModule.forRoot(
    //   { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
    //   'BrowserInstanceName' // optional, can be useful for using Chrome and Firefox in the same project
    // ),
    TypeOrmModule.forFeature([
      Merchant,
      Product,
      Order,
      OrderDetail,
      Supplier,
      Purchase,
      User,
      PurchaseDetail,
      Job,
      JobDetail,
    ]),
  ],
  controllers: [MerchantsController],
  providers: [
    MerchantsService,
    ProductService,
    OrderService,
    OrderDetailService,
    SupplierService,
    PurchaseService,
    UsersService,
    PurchaseDetailService,
    JobService,
    JobDetailService,
  ],
  exports: [MerchantsService],
})
export class MerchantsModule {}
