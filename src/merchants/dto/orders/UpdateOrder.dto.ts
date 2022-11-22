/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsNumber,
} from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @IsInt()
  @IsNumber()
  userId: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
