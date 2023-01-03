/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { JobDetailService } from '../job-detail/services/job-detail.service';

// Entities
import { JobDetail } from './job-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobDetail])],
  controllers: [],
  providers: [JobDetailService],
  exports: [JobDetailService],
})
export class JobDetailModule {}
