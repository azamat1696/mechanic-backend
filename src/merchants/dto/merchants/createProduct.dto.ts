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

  image: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  // @IsInt()
  // @IsNumber()
  @IsNotEmpty()
  supplierId: number;
}
