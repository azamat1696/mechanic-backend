/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

import { MerchantRole } from '../merchant.entity';

export class UpdateMerchantsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsEnum(MerchantRole)
  @IsNotEmpty()
  @MinLength(2)
  role: MerchantRole;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
