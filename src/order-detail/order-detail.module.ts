/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderController } from './controllers/order.controller';
// import { OrderService } from './services/order.service';
// import { Order } from './order.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [],
  providers: [],
  exports: [],
})
export class OrderDetailModule {}
