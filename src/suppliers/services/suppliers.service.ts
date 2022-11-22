/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Supplier } from '../supplier.entity';

// Dto
import { CreateSupplierDto } from '../../merchants/dto/suppliers/create.dto';
import { UpdateSupplierDto } from '../dto/update.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>
  ) {}

  async create(createSupplierDto: CreateSupplierDto, merchant: any) {
    console.log('createSupplierDto', createSupplierDto);

    const supplier = this.supplierRepository.create({
      ...createSupplierDto,
      merchant,
    });

    return await this.supplierRepository.save(supplier);
  }

  findAll() {
    return;
  }

  async findSuppliersByMerchant(id: number) {
    const suppliers = await this.supplierRepository.find({
      where: {
        merchantId: id,
      },
      relations: {
        merchant: false,
        products: true,
      },
    });

    if (suppliers) {
      return suppliers;
    }
  }

  async findOne(id: number) {
    console.log('supplier id', id);
    return await this.supplierRepository.findOneBy({ id });
  }

  async update(updateSupplierDto: UpdateSupplierDto) {
    console.log('updateSupplierDto', updateSupplierDto);
    const { id } = updateSupplierDto;
    return await this.supplierRepository.update(id, updateSupplierDto);
  }

  async remove(id: number) {
    return await this.supplierRepository.delete(id);
  }
}
