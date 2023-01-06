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
        type: 'mysql',
        port: 3306,
        host: process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
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
