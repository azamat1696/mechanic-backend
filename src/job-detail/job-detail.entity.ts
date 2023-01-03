/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

// Entities
import { Job } from '../job/job.entity';
import { Product } from '../products/product.entity';

export enum JobStatus {
  Waiting = 'Waiting',
  InProgress = 'In Progress',
  Complete = 'Complete',
}

@Entity()
export class JobDetail {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Job)
  job: Job;
  // _________
  // RELATIONS
  // _________

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
