/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  MinLength,
  //   IsInt,
  //   IsNumber,
  IsNumberString,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class UpdateMerchantDetailsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  address1: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  address2: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  address3: number;
}
