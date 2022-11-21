/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // console.log('Local Strategy');
    // const user = await this.authService.validateUser(email, password);
    const merchant = await this.authService.validateMerchant(email, password);
    let user;
    if (user && !merchant) return user;
    if (!user && merchant) return merchant;
    if (!user && !merchant) throw new UnauthorizedException();

    // if (!user) throw new UnauthorizedException();
    // if (!merchant) throw new UnauthorizedException();
    // return user;
  }
}
