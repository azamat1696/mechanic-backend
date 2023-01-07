/* eslint-disable prettier/prettier */
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import appConfig from './appConfig';

// export const jwtConfig: JwtModuleAsyncOptions = {
//   useFactory: () => {
//     console.log('appConfig().appSecret', appConfig().appSecret);
//     return {
//       secret: appConfig().appSecret,
//       signOptions: { expiresIn: '24hr' },
//     };
//   },
// };
export const jwtConfig: JwtModuleOptions = {
  secret: 'secret',
  signOptions: { expiresIn: '24hr' },
};
