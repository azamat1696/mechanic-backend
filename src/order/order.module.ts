/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [
    /*OrderController*/
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
