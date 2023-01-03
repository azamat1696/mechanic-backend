/* eslint-disable prettier/prettier */
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePurchaseOrderDetail {
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @IsArray()
  products: [];
}
