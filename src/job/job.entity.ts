/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// Entities
import { Merchant } from '../merchants/merchant.entity';
import { User } from '../users/user.entity';
import { JobDetail } from '../job-detail/job-detail.entity';

export enum JobStatus {
  Waiting = 'Waiting',
  InProgress = 'In Progress',
  Complete = 'Complete',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  // _________
  // RELATIONS
  // _________
  @ManyToOne(() => Merchant, (merchant) => merchant.job)
  merchant: Merchant;

  @ManyToOne(() => User, (user) => user.job)
  user: User;

  @OneToMany(() => JobDetail, (jobDetail) => jobDetail)
  jobDetail: JobDetail;
  // _________
  // RELATIONS
  // _________

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
