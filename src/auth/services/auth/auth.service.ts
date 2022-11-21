/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/utils/encodePassword';
import { UsersService } from '../../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { MerchantsService } from 'src/merchants/services/merchants.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private merchantService: MerchantsService,
    private jwtService: JwtService
  ) {}

  // async validateUser(email: string, password: string): Promise<any> {
  //   console.log('auth service');
  //   const user = await this.usersService.findByEmail(email);
  //   console.log('User ~~~~', user);
  //   if (user) {
  //     const matched = comparePasswords(password, user.password);
  //     if (matched) {
  //       console.log('Password correct!');
  //       return this.signUser(user);
  //     } else {
  //       console.log('Password Incorrect!');
  //     }
  //   }

  //   return null;
  // }

  async validateMerchant(email: string, password: string): Promise<any> {
    // console.log('auth service');
    const merchant = await this.merchantService.findByEmail(email);
    // console.log('Merchant ~~~~', merchant);
    if (merchant) {
      const matched = comparePasswords(password, merchant.password);
      if (matched) {
        // console.log('Password correct!');
        return this.signMerchant(merchant);
      } else {
        console.log('Password Incorrect!');
      }
    }

    return null;
  }

  async signUser(user: any) {
    const payload = { email: user.email };
    console.log('payload', payload);
    console.log('user', user.id);
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }

  async signMerchant(merchant: any) {
    const payload = { email: merchant.email };
    // console.log('payload', payload);
    // console.log('merchant', merchant.id);
    return {
      access_token: this.jwtService.sign(payload),
      // merchantId: merchant.id,
      merchant_details: merchant,
    };
  }
}
