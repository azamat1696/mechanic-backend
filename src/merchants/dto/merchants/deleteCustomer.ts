/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class DeleteCustomerDto {
  @IsNotEmpty()
  customerId: number;
}
