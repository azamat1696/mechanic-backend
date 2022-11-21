/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Supplier } from './supplier.entity';

// Services
import { SupplierService } from './services/suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SuppliersModule {}
