/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  //   Put,
  //   Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';

// DTOs
import { CreateProductDto } from '../dto/CreateProduct.dto';
import { MerchantsService } from '../../merchants/services/merchants.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly merchantsService: MerchantsService
  ) {}
  // Get all products
  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  // Get a single product
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // @Get("/merchant/:id")
  // getProductsByMerchant() {

  // Create product
  // @Post()
  // @UsePipes(ValidationPipe)
  // async createProduct(@Body() createProductDto: CreateProductDto) {
  //   const foundMerchant = await this.merchantsService.findOne(
  //     createProductDto.merchantId
  //   );

  //   if (foundMerchant) {
  //     console.log('foundMerchant', foundMerchant);
  //     console.log('createProductDto', createProductDto);
  //     this.productService.add(foundMerchant, createProductDto);
  //   } else {
  //     console.log('merchant not found');
  //   }
  // }

  // Update user
  //   @Put(':id')
  //   updateUser(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
  //     return this.usersService.update(id, updateUsersDto);
  //   }

  // Delete user
  //   @Delete(':id')
  //   deleteUser(@Param('id') id: number) {
  //     return this.usersService.remove(id);
  //   }
}
