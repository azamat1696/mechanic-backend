/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  purchase_quantity: number;
}
