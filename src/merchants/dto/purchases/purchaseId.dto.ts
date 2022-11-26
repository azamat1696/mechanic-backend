/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';

export class PurchaseIdDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;
}
