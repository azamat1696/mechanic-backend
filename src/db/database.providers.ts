/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        port: 3306,
        host: '127.0.0.1',
        username: 'halil',
        password: 'H@lilh2o',
        database: 'mechanic',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      // ssl: true,
      // extra: {
      //   ssl: true,
      //   rejectUnauthorized: false,
      // },

      return dataSource.initialize();
    },
  },
];
