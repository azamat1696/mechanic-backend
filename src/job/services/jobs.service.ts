/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Job } from '../job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>
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

  async add(merchant: any, user: any) {
    const job = this.jobsRepository.create({
      merchant,
      user,
    });
    console.log('job', job);

    if (job) {
      return await this.jobsRepository.save(job);
    }
  }

  async update() {
    return;
  }
}
