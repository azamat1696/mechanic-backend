/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsArray()
  @IsNotEmpty()
  products: [];

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
