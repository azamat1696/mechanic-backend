/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsNumber,
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
  @IsNumber()
  merchantId: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
