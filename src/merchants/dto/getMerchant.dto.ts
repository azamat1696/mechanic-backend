/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class GetMerchantDto {
  @IsNotEmpty()
  merchantId: number;
}
