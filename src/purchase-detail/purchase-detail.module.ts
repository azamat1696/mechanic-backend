/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseDetail } from '../purchase-detail/purchase-detail.entity';
import { PurchaseDetailService } from '../purchase-detail/services/purchase-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDetail])],
  controllers: [],
  providers: [PurchaseDetailService],
  exports: [PurchaseDetailService],
})
export class PurchaseDetailModule {}
