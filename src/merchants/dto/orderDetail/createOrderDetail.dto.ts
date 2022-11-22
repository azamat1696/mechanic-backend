/* eslint-disable prettier/prettier */
import { IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDetail {
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  order_id: number;
}
