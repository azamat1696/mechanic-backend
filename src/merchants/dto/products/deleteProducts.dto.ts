/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteProductsDto {
  @IsNotEmpty()
  orderDetailId: number;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
