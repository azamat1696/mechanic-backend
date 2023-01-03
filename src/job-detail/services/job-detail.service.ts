/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { JobDetail } from '../job-detail.entity';

@Injectable()
export class JobDetailService {
  constructor(
    @InjectRepository(JobDetail)
    private jobDetailRepository: Repository<JobDetail>
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

  async add(job: any, product: any, quantity: number) {
    const createdJobDetail = this.jobDetailRepository.create({
      job,
      product,
      quantity,
    });
    return await this.jobDetailRepository.save(createdJobDetail);
  }

  async update() {
    return;
  }
}
