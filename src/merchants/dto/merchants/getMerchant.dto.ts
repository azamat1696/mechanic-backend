/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMerchantDto {
  @ApiProperty({
    description: 'Expects the ID of the merchant',
    example: 3,
  })
  @IsNotEmpty()
  merchantId: number;
}
