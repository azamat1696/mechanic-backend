/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MerchantRole } from '../../merchant.entity';

export class CreateMerchantsDto {
  @ApiProperty({
    description: 'The name of the merchant',
    example: 'Tabur Ltd',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    name: 'role',
    enum: MerchantRole,
    description: 'The role of the merchant',
  })
  @IsString()
  @IsEnum(MerchantRole)
  @IsNotEmpty()
  @MinLength(2)
  role: MerchantRole;

  @ApiProperty({
    description: 'Merchant email address',
    example: 'hefecan@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Merchant password',
    example: '******',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
