/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  productId: number;
}
