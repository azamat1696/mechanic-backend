/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';

export class OrderIdDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;
}
