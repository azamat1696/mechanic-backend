/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { Merchant } from '../merchants/merchant.entity';
import { MerchantsService } from '../merchants/services/merchants.service';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Merchant]),
    PassportModule.register({
      session: true,
    }),
    // JwtModule.registerAsync(jwtConfig),
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    MerchantsService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
