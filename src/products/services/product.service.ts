/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Product } from '../product.entity';

// Dtos
import { CreateProductDto } from '../../merchants/dto/merchants/createProduct.dto';

interface Supplier {
  id: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }

  async add(
    merchant: any,
    supplier: Supplier,
    createProductDto: CreateProductDto
  ) {
    console.log('supplier =>', supplier);
    const updatedCreateProductDto = {
      ...createProductDto,
      product_code: createProductDto.productCode,
      merchant,
      supplier,
    };
    console.log('updatedCreateProductDto', updatedCreateProductDto);
    const newProduct = this.productRepository.create(updatedCreateProductDto);
    console.log('newProduct', newProduct);

    const savedProduct = await this.productRepository.save(newProduct);

    if (savedProduct) {
      console.log('savedProduct', savedProduct);
    }

    return savedProduct;
  }

  // Get products created by merchant
  async getProductsByMerch(merchant) {
    const id = merchant.id;
    const products = await this.productRepository.find({
      where: { merchantId: id },
      relations: {
        merchant: true,
        supplier: true,
      },
    });
    return products;
  }

  async getProductsBySupplier(supplierId) {
    const suppliers = await this.productRepository.find({
      where: { supplierId },
    });
    return suppliers;
  }

  async update(id: any, updateProductDto: any) {
    const foundProduct = await this.productRepository.findOneBy({ id });
    console.log('foundProduct', foundProduct);
    if (foundProduct) {
      const updatedProduct = await this.productRepository.update(id, {
        ...updateProductDto,
        // product_code: updateProductDto.productCode,
      });
      if (updatedProduct) {
        return await this.productRepository.findOneBy({ id });
      }
    }
  }
}
