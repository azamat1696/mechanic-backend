/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsArray } from 'class-validator';

export class AddProductsDto {
  @IsNotEmpty()
  id: number;
  // orderDetailId: number;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
