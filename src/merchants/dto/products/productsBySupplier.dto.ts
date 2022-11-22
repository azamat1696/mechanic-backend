/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductsBySupplierDto {
  @IsString()
  @IsNotEmpty()
  supplier: string;

  @IsNotEmpty()
  @IsInt()
  supplierId: number;
}
