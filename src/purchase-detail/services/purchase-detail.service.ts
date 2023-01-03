/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { PurchaseDetail } from '../purchase-detail.entity';

// Services
import { ProductService } from '../../products/services/product.service';
import { PurchaseService } from '../../purchases/services/purchases.service';

@Injectable()
export class PurchaseDetailService {
  constructor(
    @InjectRepository(PurchaseDetail)
    private purchaseDetailRepository: Repository<PurchaseDetail>,
    private readonly productsService: ProductService,
    private readonly purchaseService: PurchaseService
  ) {}

  async findAll() {
    return;
  }

  async findOne(id: number) {
    return await this.purchaseDetailRepository.findOneBy({ id });
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

  async update(updatePurchaseOrderDetail: any) {
    const { orderId, products } = updatePurchaseOrderDetail;

    products.forEach(async (p: any) => {
      if (p.orderDetailId === null) {
        const product = await this.productsService.findOne(p.productId);
        const purchase = await this.purchaseService.findOne(p.orderId);

        if (product) {
          await this.add(purchase, product, p.quantity);
        }
      } else {
        const purchaseDetail = await this.findOne(p.orderDetailId);

        if (purchaseDetail) {
          const { id } = purchaseDetail;
          return await this.purchaseDetailRepository.update(id, {
            quantity: p.quantity,
            price: p.price,
          });
        }
      }
    });
  }

  async findPurchaseDetailByOrder(id: number) {
    return await this.purchaseDetailRepository.find({
      where: {
        purchaseId: id,
      },
      relations: {
        product: true,
      },
    });
  }
}
