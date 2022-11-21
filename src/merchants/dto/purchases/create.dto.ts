/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsNotEmpty()
  @IsInt()
  supplierId: number;

  @IsNotEmpty()
  @IsArray()
  products: [];
}
