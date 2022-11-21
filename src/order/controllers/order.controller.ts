/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';

// DTOs
import { UpdateOrderDto } from '../dto/UpdateOrder.dto';
import { CreateOrderDto } from '../dto/CreateOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  // Get all jobs
  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  // Get a single order
  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  // Get a single order
  // @Get('user/:id')
  // getJobByUser(@Param('id') id: number) {
  //   return this.jobsService.findByUser(id);
  // }

  // || Create order ||
  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    // return this.orderService.add(createOrderDto);
  }
  // || Create order ||

  // Update order ||
  @Put(':id')
  @UsePipes(ValidationPipe)
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
  // || Update order ||

  // || Delete order ||
  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
  // Delete order ||
}
