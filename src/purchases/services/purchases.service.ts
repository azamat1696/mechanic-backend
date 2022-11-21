/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Purchase } from '../../purchases/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>
  ) {}

  async create(merchant: any, supplier: any) {
    const purchaseOrder = this.purchaseRepository.create({
      merchant,
      supplier,
    });
    return await this.purchaseRepository.save(purchaseOrder);
  }

  async findOne(id: number) {
    return await this.purchaseRepository.findOneBy({ id });
  }

  async getMerchantOrders(id: number) {
    const orders = await this.purchaseRepository.find({
      where: {
        merchantId: id,
      },
      relations: {
        purchaseDetail: true,
        supplier: true,
      },
    });

    return orders;
  }
}
