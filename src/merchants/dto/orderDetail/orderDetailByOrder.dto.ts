/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class OrderDetailByOrder {
  @IsInt()
  @IsNotEmpty()
  orderId: number;
}
