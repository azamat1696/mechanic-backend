/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { ProductsController } from '../products/controllers/product.controller';

// Entities
import { Merchant } from '../merchants/merchant.entity';
import { Product } from '../products/product.entity';

// Services
import { ProductService } from '../products/services/product.service';
import { MerchantsService } from '../merchants/services/merchants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Merchant])],
  controllers: [ProductsController],
  providers: [ProductService, MerchantsService],
  exports: [ProductService],
})
export class ProductModule {}
