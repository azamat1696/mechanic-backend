/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { OrderDetail } from '../order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>
  ) {}

  async findOne(id: any) {
    return await this.orderDetailRepository.findOneBy({ id });
  }

  async add(order: any, product: any, quantity: number, price: number) {
    const obj = {
      order,
      product,
      quantity,
      price,
    };
    const createdOD = this.orderDetailRepository.create(obj);
    const savedOd = this.orderDetailRepository.save(createdOD);
    return savedOd;
  }
}
