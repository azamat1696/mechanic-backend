/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class FindProductDto {
  @IsNotEmpty()
  productId: number;
}
