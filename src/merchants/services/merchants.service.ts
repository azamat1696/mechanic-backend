/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Merchant } from '../merchant.entity';

// Dtos
import { CreateMerchantsDto } from '../dto/merchants/create-merchant.dto';
import { UpdateMerchantsDto } from '../dto/merchants/update-merchant.dto';

// Utils
import { encodePassword } from '../../utils/encodePassword';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantsRepository: Repository<Merchant>
  ) {}

  async findAll() {
    return await this.merchantsRepository.find();
  }

  async findOne(id: number) {
    return await this.merchantsRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.merchantsRepository.findOneBy({ email });
  }

  async remove(id: number) {
    return await this.merchantsRepository.delete(id);
  }

  async add(createMerchantsDto: CreateMerchantsDto) {
    const foundMerchant = await this.merchantsRepository.findOneBy({
      email: createMerchantsDto.email,
    });

    if (!foundMerchant) {
      const password = encodePassword(createMerchantsDto.password);
      const newMerchant = this.merchantsRepository.create({
        ...createMerchantsDto,
        password,
      });
      return await this.merchantsRepository.save(newMerchant);
    } else {
      return 'User already exists!';
    }
  }

  async update(id: number, updateMerchantsDto: UpdateMerchantsDto) {
    const updatedMerchant = await this.merchantsRepository.update(
      id,
      updateMerchantsDto
    );
    if (updatedMerchant) {
      return updatedMerchant;
    }
  }
}
