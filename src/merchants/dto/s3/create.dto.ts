/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  supplierId: number;

  image: string;
}
