/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  manufacturer: string;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  merchantId: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  // @IsBoolean()
  // @IsNotEmpty()
  // isActive: boolean;
}
