/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class CreateJobDto {
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
