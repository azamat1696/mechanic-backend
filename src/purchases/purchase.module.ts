/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purchase } from '../purchases/purchase.entity';
import { PurchaseService } from '../purchases/services/purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  controllers: [],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
