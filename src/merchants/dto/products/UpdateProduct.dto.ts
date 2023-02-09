/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  manufacturer: string;

  image: string;

  imageUrl: string;

  @IsString()
  product_code: string;
}
