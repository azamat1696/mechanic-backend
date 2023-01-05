/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Order } from '../order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  // Find all by merchantId
  async findByMerchant(id: any) {
    const ordersByMerch = await this.orderRepository.find({
      where: {
        merchantId: id,
      },
      relations: {
        orderDetail: true,
        user: true,
        merchant: false,
      },
    });
    // console.log('ordersByMerch', ordersByMerch);
    return ordersByMerch;
  }
  // Find all by merchantId

  async findOne(id: number) {
    return await this.orderRepository.findOneBy({ id });
  }

  async remove(id: number) {
    // return await this.orderRepository.softDelete({ id });
    return await this.orderRepository.delete(id);
  }

  async create(merchant: any, user: any, createOrderDto: any) {
    const newOrder = this.orderRepository.create({
      merchant,
      user,
      ...createOrderDto,
    });
    return await this.orderRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: any) {
    try {
      const updatedOrder = await this.orderRepository.update(
        id,
        updateOrderDto
      );
      if (updatedOrder) {
        return updatedOrder;
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}
