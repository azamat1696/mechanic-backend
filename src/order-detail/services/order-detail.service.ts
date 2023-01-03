/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { OrderDetail } from '../order-detail.entity';

// Services
import { ProductService } from '../../products/services/product.service';
import { OrderService } from '../../order/services/order.service';

// Dto
import { UpdatedProducts } from '../../merchants/dto/orderDetail/updatedProducts.dto';
import { UpdateOrderDetailProduct } from '../../merchants/dto/orderDetail/updateOrderDetailProduct.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private readonly productsService: ProductService,
    private readonly orderService: OrderService
  ) {}

  async findByOrderId(id: number) {
    return await this.orderDetailRepository.find({
      where: {
        orderId: id,
      },
      relations: {
        product: true,
      },
    });
  }

  async findOne(id: any) {
    return await this.orderDetailRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.orderDetailRepository.delete(id);
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

  async update(updateOrderDetail: any) {
    updateOrderDetail.products.forEach(async (p: UpdateOrderDetailProduct) => {
      console.log('p', p);

      if (p.orderDetailId === null) {
        // Creates new Order Detail
        console.log('new product', p);
        const product = await this.productsService.findOne(p.productId);
        const order = await this.orderService.findOne(
          updateOrderDetail.orderId
        );

        if (product && order) {
          const newProd = await this.add(order, product, p.quantity, p.price);
        }
      } else {
        // Updates existing Order Detail Id
        const orderDetail = await this.findOne(p.orderDetailId);
        console.log('orderDetail', orderDetail);

        if (orderDetail) {
          const { orderDetailId: id } = p;
          await this.orderDetailRepository.update(id, {
            quantity: p.quantity,
            price: p.price,
          });
        }
      }
    });
  }
}
