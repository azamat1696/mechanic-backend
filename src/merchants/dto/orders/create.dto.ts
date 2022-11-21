/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  merchantId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
