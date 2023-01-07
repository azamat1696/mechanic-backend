/* eslint-disable prettier/prettier */

import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mariadb',
      url: configService.get('JAWSDB_MARIA_URL'),
      host: configService.get('HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('UN'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: configService.get('SYNCHRONIZE'),
    };
  },
  inject: [ConfigService],
};
