/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { JobService } from '../job/services/jobs.service';

// Entities
import { Job } from '../job/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
