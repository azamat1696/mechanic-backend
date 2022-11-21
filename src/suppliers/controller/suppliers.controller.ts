/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';

// Services
import { SupplierService } from '../services/suppliers.service';
// Dto
import { CreateSupplierDto } from '../dto/create.dto';
import { UpdateSupplierDto } from '../dto/update.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SupplierService) {}

  // @Post('create-supplier')
  // @UseGuards(JwtAuthGuard)
  // create(
  //   @Body() createSupplierDto: CreateSupplierDto,
  //   @Request() req: any,
  //   @Response() res: any
  // ) {
  //   console.log('createSupplierDto', createSupplierDto);
  //   // return this.supplierService.create(createSupplierDto);
  // }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSupplierDto: UpdateSupplierDto
  // ) {
  //   return this.supplierService.update(+id, updateSupplierDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
