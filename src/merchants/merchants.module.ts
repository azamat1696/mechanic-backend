import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

// Entities
import { Merchant } from './merchant.entity';
import { Product } from '../products/product.entity';
import { Order } from '../order/order.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { Purchase } from 'src/purchases/purchase.entity';
import { User } from '../users/user.entity';
import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Merchant,
      Product,
      Order,
      OrderDetail,
      Supplier,
      Purchase,
      User,
      PurchaseDetail,
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
  ],
  exports: [MerchantsService],
})
export class MerchantsModule {}
