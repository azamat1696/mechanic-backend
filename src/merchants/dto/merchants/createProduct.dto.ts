/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsNumber,
  IsNumberString,
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
  @IsNumberString()
  costPrice: number;

  // @IsInt()
  // @IsNumber()
  @IsNotEmpty()
  @IsNumberString()
  retailPrice: number;

  // @IsInt()
  // @IsNumber()
  @IsNotEmpty()
  @IsNumberString()
  minimum: number;

  @IsNotEmpty()
  supplierId: number;
}
