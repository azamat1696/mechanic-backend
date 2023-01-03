/* eslint-disable prettier/prettier */
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderDetail {
  @IsArray()
  products: [];

  @IsInt()
  @IsNotEmpty()
  orderId: number;
}
