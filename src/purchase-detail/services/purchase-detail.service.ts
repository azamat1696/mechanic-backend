/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { PurchaseDetail } from '../purchase-detail.entity';

@Injectable()
export class PurchaseDetailService {
  constructor(
    @InjectRepository(PurchaseDetail)
    private purchaseDetailRepository: Repository<PurchaseDetail>
  ) {}

  async findAll() {
    return;
  }

  async findOne() {
    return;
  }

  async remove() {
    return;
  }

  async add(purchase: any, product: any, quantity: number) {
    const obj = {
      purchase,
      product,
      quantity,
    };
    const createPoD = this.purchaseDetailRepository.create(obj);
    const savedPoD = await this.purchaseDetailRepository.save(createPoD);
    return savedPoD;
  }

  async update() {
    return;
  }
}
