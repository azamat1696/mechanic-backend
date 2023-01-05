/* eslint-disable prettier/prettier */
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDetail {
  @IsArray()
  products: [];

  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
