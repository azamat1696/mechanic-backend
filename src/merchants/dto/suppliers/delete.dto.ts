/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';

export class DeleteSupplierDto {
  @IsInt()
  @IsNotEmpty()
  supplierId: number;
}
