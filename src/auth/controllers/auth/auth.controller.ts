/* eslint-disable prettier/prettier */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { UsersService } from '../../../users/services/users.service';
import { MerchantsService } from '../../../merchants/services/merchants.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly merchantsService: MerchantsService
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login/user')
  // loginUser(@Request() req) {
  //   const { email, password } = req.body;
  //   return this.authService.validateUser(email, password);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login/merchant')
  loginMerchant(@Request() req) {
    const { email, password } = req.body;
    // console.log('email', email);
    return this.authService.validateMerchant(email, password);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(JwtAuthGuard)
  // @Get('user')
  // checkTokenUser(@Request() req) {
  //   return this.usersService.findByEmail(req.user.email);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('merchant')
  checkTokenMerchant(@Request() req) {
    console.log('req', req);
    return this.merchantsService.findByEmail(req.user.email);
  }
}
