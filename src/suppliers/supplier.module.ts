/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Supplier } from './supplier.entity';

// Controller
import { SuppliersController } from './controller/suppliers.controller';

// Services
import { SupplierService } from './services/suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SuppliersModule {}
