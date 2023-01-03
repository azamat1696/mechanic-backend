/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';
import { Product } from '../products/product.entity';
import { Purchase } from '../purchases/purchase.entity';

// Services
import { PurchaseDetailService } from '../purchase-detail/services/purchase-detail.service';
import { ProductService } from '../products/services/product.service';
import { PurchaseService } from '../purchases/services/purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDetail, Product, Purchase])],
  controllers: [],
  providers: [PurchaseDetailService, ProductService, PurchaseService],
  exports: [PurchaseDetailService],
})
export class PurchaseDetailModule {}
