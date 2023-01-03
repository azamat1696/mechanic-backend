/* eslint-disable prettier/prettier */
import { IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteOrderDetail {
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
